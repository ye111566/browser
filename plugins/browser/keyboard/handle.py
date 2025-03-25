import cv2
import numpy as np

# 读取图片
img = cv2.imread("keyboard.png", cv2.IMREAD_UNCHANGED)

# 统一为 RGBA 格式
if len(img.shape) == 2:
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGBA)
elif img.shape[2] == 3:
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGBA)
elif img.shape[2] == 4:
    img = cv2.cvtColor(img, cv2.COLOR_BGRA2RGBA)

# 补白（确保图片可以被 128x128 整除）
height, width = img.shape[:2]
rows = (height + 127) // 128
cols = (width + 127) // 128

# 创建一个新的画布，大小为 rows * 128 x cols * 128
new_height = rows * 128
new_width = cols * 128
white = np.zeros((new_height, new_width, 4), dtype=np.uint8)
white[:height, :width] = img

# 分割图片并保存为 bin 文件
for i in range(rows):
    for j in range(cols):
        # 计算每个区块的起始和结束位置
        start_y = i * 128
        end_y = start_y + 128
        start_x = j * 128
        end_x = start_x + 128
        
        # 提取区块
        block = white[start_y:end_y, start_x:end_x]
        
        # 保存为 bin 文件
        block.tofile(f"keyboard_{i}_{j}.bin")

print("分割完成，共生成 {} 个 bin 文件。".format(rows * cols))