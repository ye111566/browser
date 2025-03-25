// LiteLoader-AIDS automatic generated
/// <reference path="c:\Users\Lenovo/dts/HelperLib-master/src/index.d.ts"/> 

ll.registerPlugin(
    /* name */ "",
    /* introduction */ "",
    /* version */[2, 0, 0],

);
mc.listen('onServerStarted', () => {
    let configdata = new JsonConfigFile(`./plugins/browser/config.json`)
    configdata.init("x", 0)
    configdata.init("y", 0)
    configdata.init("z", 0)
    var x = configdata.get("x", 0)
    var y = configdata.get("y", 0)
    var z = configdata.get("z", 0)
    let setMap = ll.import("CustomMap", "setMap")
    for (let keyboardx = 0; keyboardx < 2; keyboardx++) { for (let keyboardy = 0; keyboardy < 8; keyboardy++) { log(`${setMap(`./plugins/browser/keyboard/keyboard_${keyboardx}_${keyboardy}.bin`, parseInt(200 + (keyboardx) * 10 + keyboardy))}`) } }
    function setmap(path) {
        const str = path
        const matches = str.match(/frame_(\d+)_(\d+)\.bin/);

        const number1 = parseInt(matches[1]); // 提取数字1
        const number2 = parseInt(matches[2]); // 提取数字2

        return setMap(path, parseInt(100 + number1 * 10 + number2))
    }
    function sendBlockEntityData(x, y, z, dimensionId, playerName) {
        const block = mc.getBlock(x, y, z, dimensionId);
        if (block){
        const bs = new BinaryStream();
        bs.writeBlockPos(block.pos);
        bs.writeCompoundTag(block.getBlockEntity().getNbt());
        let pldx = mc.getPlayer(playerName)
        if (pldx) {
            pldx.sendPacket(bs.createPacket(56));
        }}
    }
    function updatemap(path) {
        if (File.exists(path)) {
            const str = path
            const matches = str.match(/frame_(\d+)_(\d+)\.bin/);

            const number1 = parseInt(matches[1]); // 提取数字1
            const number2 = parseInt(matches[2]); // 提取数字2
            sendBlockEntityData(x+number2, y+(3-number1), z, 0, username)
            setMap(path, parseInt(100 + number1 * 10 + number2))
            return true
        } else { return false }
    }
    var username, screenx, screeny, taskid
    var be00, be01, be02, be03, be04, be05, be06, be07, be08
    var be10, be11, be12, be13, be14, be15, be16, be17, be18
    var be20, be21, be22, be23, be24, be25, be26, be27, be28
    var be30, be31, be32, be33, be34, be35, be36, be37, be38
    var mapid00, mapid01, mapid02, mapid03, mapid04, mapid05, mapid06, mapid07
    var mapid10, mapid11, mapid12, mapid13, mapid14, mapid15, mapid16, mapid17
    var mapid20, mapid21, mapid22, mapid23, mapid24, mapid25, mapid26, mapid27
    var mapid30, mapid31, mapid32, mapid33, mapid34, mapid35, mapid36, mapid37
    function start(x, y, z) {
        be00 = mc.getBlock(x, y + 3, z, 0).getBlockEntity(); be01 = mc.getBlock(x + 1, y + 3, z, 0).getBlockEntity(); be02 = mc.getBlock(x + 2, y + 3, z, 0).getBlockEntity(); be03 = mc.getBlock(x + 3, y + 3, z, 0).getBlockEntity(); be04 = mc.getBlock(x + 4, y + 3, z, 0).getBlockEntity(); be05 = mc.getBlock(x + 5, y + 3, z, 0).getBlockEntity(); be06 = mc.getBlock(x + 6, y + 3, z, 0).getBlockEntity(); be07 = mc.getBlock(x + 7, y + 3, z, 0).getBlockEntity();
        be10 = mc.getBlock(x, y + 2, z, 0).getBlockEntity(); be11 = mc.getBlock(x + 1, y + 2, z, 0).getBlockEntity(); be12 = mc.getBlock(x + 2, y + 2, z, 0).getBlockEntity(); be13 = mc.getBlock(x + 3, y + 2, z, 0).getBlockEntity(); be14 = mc.getBlock(x + 4, y + 2, z, 0).getBlockEntity(); be15 = mc.getBlock(x + 5, y + 2, z, 0).getBlockEntity(); be16 = mc.getBlock(x + 6, y + 2, z, 0).getBlockEntity(); be17 = mc.getBlock(x + 7, y + 2, z, 0).getBlockEntity();
        be20 = mc.getBlock(x, y + 1, z, 0).getBlockEntity(); be21 = mc.getBlock(x + 1, y + 1, z, 0).getBlockEntity(); be22 = mc.getBlock(x + 2, y + 1, z, 0).getBlockEntity(); be23 = mc.getBlock(x + 3, y + 1, z, 0).getBlockEntity(); be24 = mc.getBlock(x + 4, y + 1, z, 0).getBlockEntity(); be25 = mc.getBlock(x + 5, y + 1, z, 0).getBlockEntity(); be26 = mc.getBlock(x + 6, y + 1, z, 0).getBlockEntity(); be27 = mc.getBlock(x + 7, y + 1, z, 0).getBlockEntity();
        be30 = mc.getBlock(x, y + 0, z, 0).getBlockEntity(); be31 = mc.getBlock(x + 1, y + 0, z, 0).getBlockEntity(); be32 = mc.getBlock(x + 2, y + 0, z, 0).getBlockEntity(); be33 = mc.getBlock(x + 3, y + 0, z, 0).getBlockEntity(); be34 = mc.getBlock(x + 4, y + 0, z, 0).getBlockEntity(); be35 = mc.getBlock(x + 5, y + 0, z, 0).getBlockEntity(); be36 = mc.getBlock(x + 6, y + 0, z, 0).getBlockEntity(); be37 = mc.getBlock(x + 7, y + 0, z, 0).getBlockEntity();
        mapid00 = setmap("./plugins/browser/cache/frame_0_0.bin");
        let mapnbt00 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid00)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x),
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        })
        if (mapid00 !== -1) be00.setNbt(mapnbt00);

        mapid01 = setmap("./plugins/browser/cache/frame_0_1.bin");
        let mapnbt01 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid01)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 1),
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        })
        if (mapid01 !== -1) be01.setNbt(mapnbt01);


        mapid02 = setmap("./plugins/browser/cache/frame_0_2.bin");
        let mapnbt02 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid02)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 2),  // x 坐标增加 2
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid02 !== -1) be02.setNbt(mapnbt02);
        mapid03 = setmap("./plugins/browser/cache/frame_0_3.bin");

        let mapnbt03 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid03)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 3),  // x 坐标增加 3
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid03 !== -1) be03.setNbt(mapnbt03);

        mapid04 = setmap("./plugins/browser/cache/frame_0_4.bin");
        let mapnbt04 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid04)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 4),  // x 坐标增加 4
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid04 !== -1) be04.setNbt(mapnbt04);

        mapid05 = setmap("./plugins/browser/cache/frame_0_5.bin");
        let mapnbt05 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid05)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 5),  // x 坐标增加 5
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid05 !== -1) be05.setNbt(mapnbt05);

        mapid06 = setmap("./plugins/browser/cache/frame_0_6.bin");
        let mapnbt06 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid06)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 6),  // x 坐标增加 6
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid06 !== -1) be06.setNbt(mapnbt06);

        mapid07 = setmap("./plugins/browser/cache/frame_0_7.bin");
        let mapnbt07 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid07)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 7),  // x 坐标增加 7
            "y": new NbtInt(y + 3),
            "z": new NbtInt(z)
        });
        if (mapid07 !== -1) be07.setNbt(mapnbt07);

        mapid10 = setmap("./plugins/browser/cache/frame_1_0.bin");
        let mapnbt10 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid10)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x),
            "y": new NbtInt(y + 2),
            "z": new NbtInt(z)
        })
        if (mapid10 !== -1) be10.setNbt(mapnbt10);
        mapid11 = setmap("./plugins/browser/cache/frame_1_1.bin");
        let mapnbt11 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid11)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 1),  // x 坐标增加 1
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid11 !== -1) be11.setNbt(mapnbt11);
        mapid12 = setmap("./plugins/browser/cache/frame_1_2.bin");
        let mapnbt12 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid12)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 2),  // x 坐标增加 2
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid12 !== -1) be12.setNbt(mapnbt12);
        mapid13 = setmap("./plugins/browser/cache/frame_1_3.bin");
        let mapnbt13 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid13)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 3),  // x 坐标增加 3
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid13 !== -1) be13.setNbt(mapnbt13);
        mapid14 = setmap("./plugins/browser/cache/frame_1_4.bin");
        let mapnbt14 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid14)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 4),  // x 坐标增加 4
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid14 !== -1) be14.setNbt(mapnbt14);
        mapid15 = setmap("./plugins/browser/cache/frame_1_5.bin");
        let mapnbt15 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid15)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 5),  // x 坐标增加 5
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid15 !== -1) be15.setNbt(mapnbt15);
        mapid16 = setmap("./plugins/browser/cache/frame_1_6.bin");
        let mapnbt16 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid16)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 6),  // x 坐标增加 6
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid16 !== -1) be16.setNbt(mapnbt16);
        mapid17 = setmap("./plugins/browser/cache/frame_1_7.bin");
        let mapnbt17 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid17)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 7),  // x 坐标增加 7
            "y": new NbtInt(y + 2),  // y 坐标增加 2
            "z": new NbtInt(z)
        });
        if (mapid17 !== -1) be17.setNbt(mapnbt17);
        mapid20 = setmap("./plugins/browser/cache/frame_2_0.bin");
        let mapnbt20 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid20)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x),  // x 坐标不变
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid20 !== -1) be20.setNbt(mapnbt20);
        mapid21 = setmap("./plugins/browser/cache/frame_2_1.bin");
        let mapnbt21 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid21)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 1),  // x 坐标增加 1
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid21 !== -1) be21.setNbt(mapnbt21);
        mapid22 = setmap("./plugins/browser/cache/frame_2_2.bin");
        let mapnbt22 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid22)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 2),  // x 坐标增加 2
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid22 !== -1) be22.setNbt(mapnbt22);
        mapid23 = setmap("./plugins/browser/cache/frame_2_3.bin");
        let mapnbt23 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid23)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 3),  // x 坐标增加 3
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid23 !== -1) be23.setNbt(mapnbt23);
        mapid24 = setmap("./plugins/browser/cache/frame_2_4.bin");
        let mapnbt24 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid24)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 4),  // x 坐标增加 4
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid24 !== -1) be24.setNbt(mapnbt24);
        mapid25 = setmap("./plugins/browser/cache/frame_2_5.bin");
        let mapnbt25 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid25)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 5),  // x 坐标增加 5
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid25 !== -1) be25.setNbt(mapnbt25);
        mapid26 = setmap("./plugins/browser/cache/frame_2_6.bin");
        let mapnbt26 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid26)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 6),  // x 坐标增加 6
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid26 !== -1) be26.setNbt(mapnbt26);
        mapid27 = setmap("./plugins/browser/cache/frame_2_7.bin");
        let mapnbt27 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid27)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 7),  // x 坐标增加 7
            "y": new NbtInt(y + 1),  // y 坐标增加 1
            "z": new NbtInt(z)
        });
        if (mapid27 !== -1) be27.setNbt(mapnbt27);
        mapid30 = setmap("./plugins/browser/cache/frame_3_0.bin");
        let mapnbt30 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid30)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x),  // x 坐标不变
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid30 !== -1) be30.setNbt(mapnbt30);
        mapid31 = setmap("./plugins/browser/cache/frame_3_1.bin");
        let mapnbt31 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid31)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 1),  // x 坐标增加 1
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid31 !== -1) be31.setNbt(mapnbt31);
        mapid32 = setmap("./plugins/browser/cache/frame_3_2.bin");
        let mapnbt32 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid32)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 2),  // x 坐标增加 2
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid32 !== -1) be32.setNbt(mapnbt32);
        mapid33 = setmap("./plugins/browser/cache/frame_3_3.bin");
        let mapnbt33 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid33)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 3),  // x 坐标增加 3
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid33 !== -1) be33.setNbt(mapnbt33);
        mapid34 = setmap("./plugins/browser/cache/frame_3_4.bin");
        let mapnbt34 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid34)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 4),  // x 坐标增加 4
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid34 !== -1) be34.setNbt(mapnbt34);
        mapid35 = setmap("./plugins/browser/cache/frame_3_5.bin");
        let mapnbt35 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid35)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 5),  // x 坐标增加 5
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid35 !== -1) be35.setNbt(mapnbt35);
        mapid36 = setmap("./plugins/browser/cache/frame_3_6.bin");
        let mapnbt36 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid36)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 6),  // x 坐标增加 6
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid36 !== -1) be36.setNbt(mapnbt36);
        mapid37 = setmap("./plugins/browser/cache/frame_3_7.bin");
        let mapnbt37 = new NbtCompound({
            "Item": {
                "Count": new NbtByte(1),
                "Damage": new NbtShort(6),
                "Name": new NbtString("minecraft:filled_map"),
                "WasPickedUp": new NbtByte(0),
                "tag": {
                    "map_name_index": new NbtInt(5),
                    "map_uuid": new NbtLong(mapid37)
                }
            },
            "ItemDropChance": new NbtFloat(1.0),
            "ItemRotation": new NbtFloat(0.0),
            "id": new NbtString("GlowItemFrame"),
            "isMovable": new NbtByte(1),
            "x": new NbtInt(x + 7),  // x 坐标增加 7
            "y": new NbtInt(y),  // y 坐标不变
            "z": new NbtInt(z)
        });
        if (mapid37 !== -1) be37.setNbt(mapnbt37);

    }
    function update() {
        updatemap("./plugins/browser/frame/frame_0_0.bin")
        updatemap("./plugins/browser/frame/frame_0_1.bin")
        updatemap("./plugins/browser/frame/frame_0_2.bin")
        updatemap("./plugins/browser/frame/frame_0_3.bin")
        updatemap("./plugins/browser/frame/frame_0_4.bin")
        updatemap("./plugins/browser/frame/frame_0_5.bin")
        updatemap("./plugins/browser/frame/frame_0_6.bin")
        updatemap("./plugins/browser/frame/frame_0_7.bin")
        updatemap("./plugins/browser/frame/frame_1_0.bin")
        updatemap("./plugins/browser/frame/frame_1_1.bin")
        updatemap("./plugins/browser/frame/frame_1_2.bin")
        updatemap("./plugins/browser/frame/frame_1_3.bin")
        updatemap("./plugins/browser/frame/frame_1_4.bin")
        updatemap("./plugins/browser/frame/frame_1_5.bin")
        updatemap("./plugins/browser/frame/frame_1_6.bin")
        updatemap("./plugins/browser/frame/frame_1_7.bin")
        updatemap("./plugins/browser/frame/frame_2_0.bin")
        updatemap("./plugins/browser/frame/frame_2_1.bin")
        updatemap("./plugins/browser/frame/frame_2_2.bin")
        updatemap("./plugins/browser/frame/frame_2_3.bin")
        updatemap("./plugins/browser/frame/frame_2_4.bin")
        updatemap("./plugins/browser/frame/frame_2_5.bin")
        updatemap("./plugins/browser/frame/frame_2_6.bin")
        updatemap("./plugins/browser/frame/frame_2_7.bin")
        updatemap("./plugins/browser/frame/frame_3_0.bin")
        updatemap("./plugins/browser/frame/frame_3_1.bin")
        updatemap("./plugins/browser/frame/frame_3_2.bin")
        updatemap("./plugins/browser/frame/frame_3_3.bin")
        updatemap("./plugins/browser/frame/frame_3_4.bin")
        updatemap("./plugins/browser/frame/frame_3_5.bin")
        updatemap("./plugins/browser/frame/frame_3_6.bin")
        updatemap("./plugins/browser/frame/frame_3_7.bin")

    }
    function Callback(cmd, origin, out, res) {
        switch (res.mode) {
            case "stop":
                clearInterval(taskid)
                username = null
                mc.broadcast(`浏览器的刷新任务已经取消!`)
                break
            case "start":
                clearInterval(taskid)
                username = null
                mc.broadcast(`浏览器的刷新任务已经取消!`)
                mc.broadcast(`${username}已经接管浏览器的操作！`)

                username = origin.player.name
                start(x, y, z)
                taskid = setInterval(() => {
                    update()

                    let user = mc.getPlayer(username)

                    if (user) {
                        //user.refreshChunks()
                        let x0 = user.pos.x
                        let y0 = user.pos.y
                        let z0 = user.pos.z
                        let k = z + 0.2
                        let rym = user.direction.yaw * (Math.PI / 180)
                        let rxm = user.direction.pitch * (Math.PI / 180)
                        let a = -Math.cos(rxm) * Math.sin(rym)
                        let b = -Math.sin(rxm)
                        let c = Math.cos(rxm) * Math.cos(rym)
                        let mouse_x = x0 + a * (k - z0) / c
                        let mouse_y = y0 + b * (k - z0) / c
                        let mouse_z = k
                        screenx = Math.round((mouse_x - x) * 128)
                        screeny = 512 - Math.round((mouse_y - y) * 128)
                        //mc.runcmdEx(`title ${username} actionbar 视角点(${x0} ${y0} ${z0}),视角向量(${a} ${b} ${c}),指向:${mouse_x} ${mouse_y} ${mouse_z} `)
                        //mc.spawnParticle(mouse_x, mouse_y, mouse_z, 0, "minecraft:villager_happy")
                    }
                }, 50);
                break
        }
    }
    let cmd = mc.newCommand("browser", '§d浏览器', PermType.Any);
    cmd.setEnum('mode', ['start', 'stop']);
    cmd.optional('mode', ParamType.Enum, 'mode', 1);

    cmd.optional("pos", ParamType.BlockPos)
    cmd.optional("site", ParamType.String)

    cmd.overload(["mode"]);
    cmd.setCallback(Callback);
    cmd.setup();
    mc.listen("onUseFrameBlock", (pl, bl) => {
        if (screenx && screeny && pl.name == username) {
            //pl.tell(`点击操作${screenx},${screeny}`)
            if (screenx <= 1024 && screeny <= 512 && screenx >= 0 && screeny >= 0) {

                let mousedata = new JsonConfigFile(`./plugins/browser/mouse.json`)
                mousedata.set("l", [[screenx, screeny]])
                //mc.runcmdEx(`structure load screenplay ${x} ${y} ${z}`)
                return false
            } else if (screenx <= 1024 && screeny <= 768 && screenx >= 0 && screeny >= 512) {
                let keyboarddata = new JsonConfigFile(`./plugins/browser/keyboard.json`)
                pl.tell(`键盘操作${screenx},${screeny}`);
                keyboarddata.set("key", [[screenx, screeny]])
                return false
            }
        }


    })
})
