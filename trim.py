from PIL import Image

img = Image.open('public/logo.png')
# Get bounding box of non-transparent pixels
bbox = img.getbbox()
if bbox:
    trimmed = img.crop(bbox)
    trimmed.save('public/logo-trimmed.png')
    print(f"Original size: {img.size}, Trimmed size: {trimmed.size}")
else:
    print("No bounding box found (fully transparent?)")
