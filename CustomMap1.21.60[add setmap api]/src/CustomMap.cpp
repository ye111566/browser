#include "CustomMap.h"

#include <RemoteCallAPI.h>
#include <ll/api/command/CommandHandle.h>
#include <ll/api/command/CommandRegistrar.h>
#include <ll/api/mod/NativeMod.h>
#include <ll/api/mod/RegisterHelper.h>
#include <ll/api/service/Bedrock.h>
#include <mc/legacy/ActorUniqueID.h>
#include <mc/nbt/Int64Tag.h>
#include <mc/server/ServerLevel.h>
#include <mc/server/commands/CommandOrigin.h>
#include <mc/server/commands/CommandOutput.h>
#include <mc/server/commands/CommandPermissionLevel.h>
#include <mc/world/actor/player/Player.h>
#include <mc/world/item/MapItem.h>
#include <mc/world/level/Level.h>
#include <mc/world/level/MapDataManager.h>
#include <mc/world/level/dimension/VanillaDimensions.h>
#include <mc/world/level/saveddata/maps/MapItemSavedData.h>
#include <mc/network/packet/ClientboundMapItemDataPacket.h>
#include <mc/world/level/storage/LevelStorage.h>
#include <mc/world/level/storage/db_helpers/Category.h>

#define logger CustomMap::getInstance().getSelf().getLogger()

bool setPixel(MapItemSavedData& map, uint color, uint x, uint y) {
    size_t index = x + y * 128;

    if (map.mUnkedc92c.as<std::vector<uint>>()[index] == color) return false;

    map.mUnkedc92c.as<std::vector<uint>>()[index]  = color;
    map.mUnk33dae3.as<bool>()   = true;
    map.mUnkaa89b9.as<bool>() = true;

    for (auto& trackedActor : map.mUnkad59b1.as<std::vector<std::shared_ptr<MapItemTrackedActor>>>()) {
        if (trackedActor->mUnkf41f17.as<bool>()) {
            trackedActor->mUnk369cab.as<uint32>() =
                (x < trackedActor->mUnk369cab.as<uint32>()) ? x : trackedActor->mUnk369cab.as<uint32>();
            trackedActor->mUnk66a3bf.as<uint32>() =
                (y < trackedActor->mUnk66a3bf.as<uint32>()) ? y : trackedActor->mUnk66a3bf.as<uint32>();
            trackedActor->mUnk8bdf44.as<uint32>() =
                (x > trackedActor->mUnk8bdf44.as<uint32>()) ? x : trackedActor->mUnk8bdf44.as<uint32>();
            trackedActor->mUnk5b38b5.as<uint32>() =
                (y > trackedActor->mUnk5b38b5.as<uint32>()) ? y : trackedActor->mUnk5b38b5.as<uint32>();
        } else {
            trackedActor->mUnkf41f17.as<bool>()   = true;
            trackedActor->mUnk369cab.as<uint32>() = trackedActor->mUnk8bdf44.as<uint32>() = x;
            trackedActor->mUnk66a3bf.as<uint32>() = trackedActor->mUnk5b38b5.as<uint32>() = y;
        }
    }

    return true;
}

buffer_span<uint> getPixels(MapItemSavedData& map) {
    buffer_span<uint> result{};
    result.mBegin = map.mUnkedc92c.as<std::vector<uint>>().data();
    result.mEnd = map.mUnkedc92c.as<std::vector<uint>>().data() + map.mUnkedc92c.as<std::vector<uint>>().size();
    return result;
}

void setLocked(MapItemSavedData& map){
    if(!map.mUnk3709d4.as<bool>()){
        map.mUnk33dae3.as<int16>() = 257;
        map.mUnk3709d4.as<bool>() = true;
    }
}

void setScale(MapItemSavedData& map, int mapScale){
    if (map.mUnk6b22d5.as<char>() != mapScale){
        map.mUnk33dae3.as<int16>() = 257;
        map.mUnk6b22d5.as<char>() = static_cast<char>(mapScale);
    }
}

namespace custom_map {

struct MapParams {
    std::string filename;
    bool        alpha{false};
    bool        output{true};
};

void MapSetPixels(MapItemSavedData& mapd, std::ifstream& ifs, bool alpha) {

    setPixel(mapd, 0, 0, 0);
    setPixel(mapd, 0, 127, 127);

    auto pixels = const_cast<unsigned int*>(getPixels(mapd).mBegin);
    ifs.read(reinterpret_cast<char*>(pixels), sizeof(unsigned int) * 128 * 128);

    if (!alpha) {
        auto alpha_bit = 0xff << 24;
        for (int i = 0; i < 128 * 128; i++) {
            pixels[i] |= alpha_bit;
        }
    }

    setLocked(mapd);
    mapd.setOrigin(
        Vec3(1e9, 0., 1e9),
        0,
        VanillaDimensions::Overworld(),
        false,
        false,
        BlockPos((int)1e9, 0, (int)1e9)
    );
}


void RegisterMapCommands() {
    auto& command = ll::command::CommandRegistrar::getInstance()
                        .getOrCreateCommand("map", "Customize the pixels on the map", CommandPermissionLevel::Any);
    command.overload<MapParams>()
        .required("filename")
        .optional("alpha")
        .optional("output")
        .execute([&](CommandOrigin const& origin, CommandOutput& output, MapParams const& param, Command const&) {
            auto* entity = origin.getEntity();
            if (entity == nullptr || !entity->isType(ActorType::Player)) {
                output.error("Only players can use this command");
                return;
            }

            auto* player = static_cast<Player*>(entity);
            auto* level  = origin.getLevel();

            auto& item = player->getCarriedItem();
            auto& data = item.mUserData;

            if (data == nullptr) {
                output.error("You must hold a filled map in your hand");
                return;
            }

            auto* mapd = level->getMapSavedData(*data);

            if (mapd == nullptr) {
                output.error("You must hold a filled map in your hand");
                return;
            }

            std::ifstream ifs(param.filename + ".bin", std::ios::binary);
            if (ifs.fail()) {
                ifs.open(param.filename, std::ios::binary);
                if (ifs.fail()) {
                    output.error("No such file or directory.");
                    return;
                }
            }

            MapSetPixels(*mapd, ifs, param.alpha);
            
            mapd->save(level->getLevelStorage());
            
            ClientboundMapItemDataPacket(mapd, *level).sendToClients();
            if (param.output) {
                output.success("Map data has been updated");
            } else {
                output.success("");
            }
        });
}

void RemoteCallExport() {
    RemoteCall::exportAs("CustomMap", "delMap", [](long long uuid) {
        std::string mapKey = std::format("map_{}", uuid);
        auto&       db     = ll::service::getLevel()->getLevelStorage();
        if (db.hasKey(mapKey, DBHelpers::Category::Item)) {
            db.deleteData(mapKey, DBHelpers::Category::Item);
            return true;
        } else {
            return false;
        }
    });

    RemoteCall::exportAs("CustomMap", "getMapList", []() {
        std::vector<long long> uuids;
        auto&                  db = ll::service::getLevel()->getLevelStorage();
        db.forEachKeyWithPrefix("map_", DBHelpers::Category::Item, [&](std::string_view key_left, std::string_view) {
            try {
                uuids.push_back(std::stoll(key_left.data()));
            } catch (std::exception& e) {
                logger.error(e.what());
                return;
            }
        });
        return uuids;
    });

    auto addMap = [](const std::string& filepath, bool alpha) {
        std::ifstream ifs(filepath, std::ios::binary);
        if (ifs.fail()) {
            return -1LL;
        }

        auto& level = static_cast<ServerLevel&>(ll::service::getLevel().get());
        auto  uid   = level.getNewUniqueID();
        auto& mapd  = level._getMapDataManager().createMapSavedData(uid);

        setScale(mapd, 4); // no parentMapId
        MapSetPixels(mapd, ifs, alpha);

        mapd.save(level.getLevelStorage());
        ClientboundMapItemDataPacket(&mapd, level).sendToClients();
        return uid.rawID;
    };
    
	auto setMap = [](const std::string& filepath,int mapid, bool alpha) {
        std::ifstream ifs(filepath, std::ios::binary);
        if (ifs.fail()) {
            return -1LL;
        }
		
		// 创建 ActorUniqueID 对象
		auto uid=ActorUniqueID{mapid};
		
		// 使用指定的 uid 创建地图数据
		auto& level = static_cast<ServerLevel&>(ll::service::getLevel().get());
		auto& mapd = level._getMapDataManager().createMapSavedData(uid);
        
        

        setScale(mapd, 4); // no parentMapId
        MapSetPixels(mapd, ifs, alpha);

        mapd.save(level.getLevelStorage());
        ClientboundMapItemDataPacket(&mapd, level).sendToClients();
        return uid.rawID;
    };

	
	
	// 导出 setMapPixels 的简化版本（默认 alpha 为 true）
	RemoteCall::exportAs("CustomMap", "setMap", [&setMap](const std::string& filepath,int mapId) {
	    return setMap( filepath,mapId,true);
	});

    RemoteCall::exportAs("CustomMap", "addMap", [&addMap](const std::string& filepath) {
        return addMap(filepath, true);
    });

    RemoteCall::exportAs("CustomMap", "addMapNoAlpha", [&addMap](const std::string& filepath) {
        return addMap(filepath, false);
    });
}

CustomMap& CustomMap::getInstance() {
    static CustomMap instance;
    return instance;
}

bool CustomMap::load() {
    getSelf().getLogger().info("loading...");

    // Code for loading the plugin goes here.
    RemoteCallExport();

    return true;
}

bool CustomMap::enable() {
    getSelf().getLogger().info("enabling...");

    // Code for enabling the plugin goes here.
    RegisterMapCommands();

    return true;
}

bool CustomMap::disable() {
    getSelf().getLogger().info("disabling...");

    // Code for disabling the plugin goes here.

    return true;
}

LL_REGISTER_MOD(custom_map::CustomMap, custom_map::CustomMap::getInstance());

} // namespace custom_map
