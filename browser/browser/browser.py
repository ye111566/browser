from playwright.sync_api import sync_playwright
import numpy as np
import os
import time
import cv2
import shutil
import json
def find_key_by_coordinates(x, y):

    data={
        560:{
            "Escape": (0, 47),
            "Backquote": (47, 103),
            "Digit1": (103, 162),
            "Digit2": (162, 215),
            "Digit3": (215, 275),
            "Digit4": (275, 333),
            "Digit5": (333, 393),
            "Digit6": (393, 444),
            "Digit7": (444, 508),
            "Digit8": (508, 560),
            "Digit9": (560, 608),
            "Digit0": (608, 664),
            "Minus": (664, 723),
            "Equal": (723, 780),
            "Backspace": (780, 866)
        },
        609:{
            "Tab": (0, 91),
            "Q": (91, 143),
            "W": (143, 195),
            "E": (195, 247),
            "R": (247, 301),
            "T": (301, 357),
            "Y": (357, 420),
            "U": (420, 471),
            "I": (471, 531),
            "O": (531, 582),
            "P": (582, 638),
            "BracketLeft": (638, 699),
            "BracketRight": (699, 755),
            "Backslash": (755, 809),
            "Delete": (809, 868)
        },
        663:{
            "CapsLock": (0, 116),
            "A": (116, 170),
            "S": (170, 223),
            "D": (223, 275),
            "F": (275, 331),
            "G": (331, 385),
            "H": (385, 437),
            "J": (437, 497),
            "K": (497, 554),
            "L": (554, 607),
            "Semicolon": (607, 663),
            "Quote": (663, 725),
            "Enter": (725, 864)
        },
        712:{
            "Shift": (0, 138),
            "Z": (138, 195),
            "X": (195, 252),
            "C": (252, 308),
            "V": (308, 363),
            "B": (363, 418),
            "N": (418, 473),
            "M": (473, 534),
            "Comma": (534, 591),
            "Period": (591, 644),
            "Slash": (644, 697),
            "PageUp": (697, 753),
            "Shift": (753, 860)
        },
        768:{
            "Fn": (0, 53),
            "Ctrl": (53, 109),
            "Win": (109, 162),
            "Alt": (162, 221),
            "Space": (221, 529),
            "Alt": (529, 584),
            "Ctrl": (584, 641),
            "ArrowLeft": (641, 696),
            "PageDown": (696, 746),
            "ArrowRight": (746, 799),
            "Calc": (799, 858)
        }
    }

    def find_interval(sorted_list, target):
        for i in range(len(sorted_list)):
            if sorted_list[i] > target:
                return (sorted_list[i-1], sorted_list[i])
    def find_key_by_number(interval_dict, number):
        for key, (start, end) in interval_dict.items():
            if start <= number < end:
                return key
        return None
    ystd=list(data.keys())    
    ystd.insert(0,512)
    ymin,ymax=find_interval(ystd,y)
    xdata=data[ymax]
    return find_key_by_number(xdata,x)
    
    

def capture_and_split_to_bin(url, output_dir, cache_dir, width=1024, height=512, rows=4, cols=8):
    # 创建输出文件夹和缓存文件夹
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)
    
    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(channel="msedge",headless=True)
        page = browser.new_page()
        page.goto(url)
        
        # 设置视口大小
        page.set_viewport_size({"width": width, "height": height})
        
        try:
            while True:
                # 清空 frame 文件夹
                for filename in os.listdir(output_dir):
                    file_path = os.path.join(output_dir, filename)
                    try:
                        if os.path.isfile(file_path) or os.path.islink(file_path):
                            os.unlink(file_path)
                        elif os.path.isdir(file_path):
                            shutil.rmtree(file_path)
                    except Exception as e:
                        print(f"Failed to delete {file_path}. Reason: {e}")
                
                # 截图并保存为 PNG
                screenshot = page.screenshot(type="png")
                screenshot_path = os.path.join(output_dir, "full_screenshot.png")
                with open(screenshot_path, "wb") as f:
                    f.write(screenshot)
                
                # 将 PNG 图片加载为 NumPy 数组
                img = cv2.imread(screenshot_path, cv2.IMREAD_UNCHANGED)
                
                # 统一为 RGBA 格式
                if len(img.shape) == 2:
                    img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGBA)
                elif img.shape[2] == 3:
                    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
                elif img.shape[2] == 4:
                    img = cv2.cvtColor(img, cv2.COLOR_BGRA2RGBA)
                
                # 补白（确保图片可以被 128x128 整除）
                size = (img.shape[1] // 128, img.shape[0] // 128)
                if size[1] * 128 < img.shape[0]:
                    size = (size[0], size[1] + 1)
                if size[0] * 128 < img.shape[1]:
                    size = (size[0] + 1, size[1])
                
                white = np.zeros((size[1] * 128, size[0] * 128, 4), dtype=np.uint8)
                white[:img.shape[0], :img.shape[1]] = img
                img = white
                
                # 遍历每个区域进行比较
                for i in range(size[0]):
                    for j in range(size[1]):
                        slice = img[j * 128: (j + 1) * 128, i * 128: (i + 1) * 128]
                        cache_bin_path = os.path.join(cache_dir, f"frame_{j}_{i}.bin")
                        current_bin_path = os.path.join(output_dir, f"frame_{j}_{i}.bin")
                        
                        # 如果 cache 文件夹中存在对应的 bin 文件，则进行比较
                        if os.path.exists(cache_bin_path):
                            with open(cache_bin_path, "rb") as f:
                                cache_data = f.read()
                            current_data = slice.tobytes()
                            
                            if cache_data != current_data:
                                # 如果不同，则保存当前周期的区域图片到 frame 文件夹
                                convert_bin(slice, current_bin_path)
                                print(f"区域 {j}_{i} 不同，已保存到: {current_bin_path}")
                        else:
                            # 如果 cache 文件夹中不存在对应的 bin 文件，则直接保存
                            convert_bin(slice, current_bin_path)
                            print(f"区域 {j}_{i} 无缓存，已保存到: {current_bin_path}")
                
                # 将当前周期的图片覆盖到 cache 文件夹
                for filename in os.listdir(output_dir):
                    if filename.endswith(".bin"):
                        shutil.copy(os.path.join(output_dir, filename), os.path.join(cache_dir, filename))
                with open("mouse.json") as json_read:
                    f=json.load(json_read)
                    #print(f"{len(f["l"])} {len(f["r"])}")
                    if len(f["l"])>=1 or len(f["r"])>=1:
                        
                        if len(f["l"])==1:

                            lx,ly=f["l"][0]
                            click_left_at_pixel(page,lx,ly)
                            f["l"]=[]
                        if len(f["r"])==1:
                            rx,ry=f["r"][0]
                            click_right_at_pixel(page,rx,ry)
                            f["r"]=[]
                        with open("mouse.json","w") as json_file:
                            json.dump(f, json_file, indent=4)
                with open("keyboard.json") as json_read2:
                    f2=json.load(json_read2)
                    #print(f"{len(f["l"])} {len(f["r"])}")
                    if len(f2["key"])>=1:
                        
                        if len(f2["key"])==1:

                            lx2,ly2=f2["key"][0]
                            page.keyboard.down(find_key_by_coordinates(lx2,ly2))
                            page.keyboard.up(find_key_by_coordinates(lx2,ly2))
                            f2["key"]=[]
                        
                        with open("keyboard.json","w") as json_file2:
                            json.dump(f2, json_file2, indent=4)
                        # 控制帧率
                time.sleep(1 / 20)  # 20 FPS
        
        except KeyboardInterrupt:
            print("截图停止")
        
        finally:
            browser.close()

def convert_bin(arr: np.ndarray, output: str):
    # 将 NumPy 数组序列化为二进制数据
    arr = arr.reshape((128 * 128 * 4))
    arr = arr.tobytes()
    with open(output, "wb") as f:
        f.write(arr)
def click_left_at_pixel(page, x, y):
    page.mouse.click(x, y, button="left")
def click_right_at_pixel(page, x, y):
    page.mouse.click(x, y, button="right")
if __name__ == "__main__":
    url = input("请输入网站地址: ")
    output_dir = os.path.join(os.getcwd(), "frame")  # 输出文件夹路径
    cache_dir = os.path.join(os.getcwd(), "cache")  # 缓存文件夹路径
    capture_and_split_to_bin(url, output_dir, cache_dir)