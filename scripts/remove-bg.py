from collections import deque
from pathlib import Path

from PIL import Image
import numpy as np

path = Path(__file__).resolve().parents[1] / "img" / "profile.png"
img = Image.open(path).convert("RGBA")
data = np.array(img)
height, width = data.shape[:2]
visited = np.zeros((height, width), dtype=bool)
threshold = 35


def is_bg(r, g, b):
    return r <= threshold and g <= threshold and b <= threshold


queue = deque()
for x in range(width):
    for y in (0, height - 1):
        if is_bg(data[y, x, 0], data[y, x, 1], data[y, x, 2]):
            queue.append((y, x))
            visited[y, x] = True

for y in range(height):
    for x in (0, width - 1):
        if is_bg(data[y, x, 0], data[y, x, 1], data[y, x, 2]) and not visited[y, x]:
            queue.append((y, x))
            visited[y, x] = True

while queue:
    y, x = queue.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < height and 0 <= nx < width and not visited[ny, nx]:
            if is_bg(data[ny, nx, 0], data[ny, nx, 1], data[ny, nx, 2]):
                visited[ny, nx] = True
                queue.append((ny, nx))

data[visited, 3] = 0
Image.fromarray(data).save(path)
print(f"Updated {path}")
