from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "img" / "web"


def save_fit(source, name, size, centering=(0.5, 0.5), quality=80):
    image = Image.open(ROOT / source).convert("RGB")
    image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=centering)
    image.save(OUT / name, "WEBP", quality=quality, method=6)


def save_contained(source, name, max_size, quality=80):
    image = Image.open(ROOT / source).convert("RGB")
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    image.save(OUT / name, "WEBP", quality=quality, method=6)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    save_fit("img/people/profile.jpg", "divyesh-profile.webp", (720, 720), centering=(0.53, 0.66), quality=82)
    save_fit("img/people/drdivyesh.jpg", "phd-defense.webp", (1200, 760), centering=(0.56, 0.5), quality=80)
    save_fit("img/emi/photo1.jpg", "emi-presentation.webp", (960, 620), centering=(0.5, 0.5), quality=78)
    save_fit("img/emi/photo2.jpg", "emi-discussion.webp", (960, 620), centering=(0.5, 0.5), quality=78)
    save_fit("img/emi/photo3.jpg", "emi-boulder.webp", (960, 620), centering=(0.5, 0.58), quality=78)
    save_contained("img/research_updates/asme-ppb-interaction-dark.jpg", "asme-ppb-interaction.webp", (1800, 900), quality=82)
    save_contained("img/research_updates/asme-ppb-schematic.jpg", "asme-ppb-schematic.webp", (1400, 900), quality=80)
    save_contained("img/research_updates/tungsten-ddd-evolution.jpg", "tungsten-ddd-evolution.webp", (1200, 1000), quality=80)
    save_contained("img/research_updates/tungsten-crack-tip-poster.jpg", "tungsten-crack-tip-poster.webp", (1024, 768), quality=80)
    save_contained("img/research_ds/gp_cube01.png", "gamma-prime-md.webp", (1000, 760), quality=80)


if __name__ == "__main__":
    main()
