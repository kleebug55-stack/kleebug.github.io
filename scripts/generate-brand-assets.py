from collections import deque
from pathlib import Path
from shutil import copyfile

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
FAVICON_SOURCE = ROOT / "private-assets" / "纯插图版.png"
LOGO_SOURCE = ROOT / "private-assets" / "带名字.png"
HORIZONTAL_LOGO_SOURCE = ROOT / "private-assets" / "左右布局.png"
COMMON_DIR = ROOT / "public" / "images" / "common"


def remove_connected_white_background(image: Image.Image, threshold: int = 246) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    seen = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def index(x: int, y: int) -> int:
        return y * width + x

    def is_background_candidate(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        return a > 0 and r >= threshold and g >= threshold and b >= threshold

    for x in range(width):
        for y in (0, height - 1):
            if is_background_candidate(x, y):
                queue.append((x, y))
                seen[index(x, y)] = 1

    for y in range(height):
        for x in (0, width - 1):
            if not seen[index(x, y)] and is_background_candidate(x, y):
                queue.append((x, y))
                seen[index(x, y)] = 1

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= width or ny >= height:
                continue
            offset = index(nx, ny)
            if seen[offset] or not is_background_candidate(nx, ny):
                continue
            seen[offset] = 1
            queue.append((nx, ny))

    for y in range(height):
        for x in range(width):
            if seen[index(x, y)]:
                r, g, b, _ = pixels[x, y]
                pixels[x, y] = (r, g, b, 0)

    return image


def remove_connected_corner_background(image: Image.Image, tolerance: int = 34) -> Image.Image:
    image = image.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    corner = pixels[0, 0][:3]
    seen = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def index(x: int, y: int) -> int:
        return y * width + x

    def is_background_candidate(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        return a > 0 and max(abs(r - corner[0]), abs(g - corner[1]), abs(b - corner[2])) <= tolerance

    for x in range(width):
        for y in (0, height - 1):
            if is_background_candidate(x, y):
                queue.append((x, y))
                seen[index(x, y)] = 1

    for y in range(height):
        for x in (0, width - 1):
            if not seen[index(x, y)] and is_background_candidate(x, y):
                queue.append((x, y))
                seen[index(x, y)] = 1

    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= width or ny >= height:
                continue
            offset = index(nx, ny)
            if seen[offset] or not is_background_candidate(nx, ny):
                continue
            seen[offset] = 1
            queue.append((nx, ny))

    for y in range(height):
        for x in range(width):
            if seen[index(x, y)]:
                r, g, b, _ = pixels[x, y]
                pixels[x, y] = (r, g, b, 0)

    return image


def crop_to_alpha(image: Image.Image, padding_ratio: float) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return image

    left, top, right, bottom = bbox
    padding = round(max(right - left, bottom - top) * padding_ratio)
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def square_canvas(image: Image.Image, padding_ratio: float) -> Image.Image:
    side = max(image.width, image.height)
    padding = round(side * padding_ratio)
    canvas_side = side + padding * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (255, 255, 255, 0))
    canvas.alpha_composite(image, ((canvas_side - image.width) // 2, (canvas_side - image.height) // 2))
    return canvas


def save_resized_png(image: Image.Image, size: int, target: Path) -> None:
    resized = image.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(target, optimize=True)


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    ratio = width / image.width
    height = round(image.height * ratio)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def crop_wordmark(image: Image.Image) -> Image.Image:
    pixels = image.load()
    xs: list[int] = []
    ys: list[int] = []
    start_y = round(image.height * 0.72)

    for y in range(start_y, image.height):
        for x in range(image.width):
            r, g, b, a = pixels[x, y]
            if a > 10 and r < 90 and g < 130 and b < 90:
                xs.append(x)
                ys.append(y)

    if not xs or not ys:
        return crop_to_alpha(image, 0.04)

    left, top, right, bottom = min(xs), min(ys), max(xs) + 1, max(ys) + 1
    padding_x = round((right - left) * 0.025)
    padding_y = round((bottom - top) * 0.025)
    return image.crop((
        max(0, left - padding_x),
        max(0, top - padding_y),
        min(image.width, right + padding_x),
        min(image.height, bottom + padding_y),
    ))


def main() -> None:
    COMMON_DIR.mkdir(parents=True, exist_ok=True)

    favicon = remove_connected_white_background(Image.open(FAVICON_SOURCE))
    favicon = crop_to_alpha(favicon, 0.02)
    favicon_square = square_canvas(favicon, 0.05)

    save_resized_png(favicon_square, 16, ROOT / "public" / "favicon-16x16.png")
    save_resized_png(favicon_square, 32, ROOT / "public" / "favicon-32x32.png")
    save_resized_png(favicon_square, 192, ROOT / "public" / "android-chrome-192x192.png")
    save_resized_png(favicon_square, 512, ROOT / "public" / "android-chrome-512x512.png")
    save_resized_png(favicon_square, 180, ROOT / "public" / "apple-touch-icon.png")
    favicon_square.save(
        ROOT / "public" / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    logo = remove_connected_white_background(Image.open(LOGO_SOURCE))
    logo = crop_to_alpha(logo, 0.025)
    logo.save(COMMON_DIR / "kleebug-logo.png", optimize=True)

    if HORIZONTAL_LOGO_SOURCE.exists():
        copyfile(HORIZONTAL_LOGO_SOURCE, COMMON_DIR / "kleebug-logo-horizontal.png")
        nav_logo = remove_connected_corner_background(Image.open(HORIZONTAL_LOGO_SOURCE))
        nav_logo = crop_to_alpha(nav_logo, 0.015)
        nav_logo = resize_to_width(nav_logo, 720)
        nav_logo.save(COMMON_DIR / "kleebug-logo-nav.png", optimize=True)


if __name__ == "__main__":
    main()
