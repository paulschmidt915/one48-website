"""
remove_white_bg.py
------------------
Entfernt weiße (und nahezu weiße) Hintergründe aus Bildern und speichert sie
als transparente PNGs im Zielordner (standardmäßig `public/categorie_icons`).

Zwei Modi:
  1) --mode threshold   (default)  — harter Schwellwert + weicher Übergangsbereich.
                                      Ideal für Logos / Icons mit sauberem Weißgrund.
  2) --mode luminance             — "Weiß ausrechnen" via Alpha-aus-Luminanz.
                                      Ideal für Partikel-, Spray-, Rauch-, Aquarellbilder
                                      oder alles mit feinen Details und Farbverläufen.
                                      Jedes Pixel behält seine Sichtbarkeit proportional
                                      zu seiner Dunkelheit — auch ganz helle Sprenkel
                                      überleben (mit niedriger Deckkraft).

Verwendung:
    python3 scripts/remove_white_bg.py                              # threshold-modus, scripts/input_icons
    python3 scripts/remove_white_bg.py bild1.png bild2.png          # explizite Dateien
    python3 scripts/remove_white_bg.py --mode luminance bild.png    # Partikel-Modus
    python3 scripts/remove_white_bg.py -o public/icons bild.png

Optionen:
    -o / --out-dir     Zielordner (default: public/categorie_icons)
    -m / --mode        threshold | luminance  (default: threshold)
    -t / --threshold   RGB-Schwellwert für Weiß (0-255, default 240). Nur im threshold-Modus.
    -s / --soft-range  Breite des weichen Alpha-Übergangs (default 20). Nur im threshold-Modus.
    --white-point      "Weiß"-Wert für den luminance-Modus (default 250).
                        Pixel die gleich hell oder heller sind werden vollständig transparent.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image
import numpy as np


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_INPUT_DIR = Path(__file__).resolve().parent / "input_icons"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "public" / "categorie_icons"


def remove_white_background_threshold(
    image_path: Path,
    output_path: Path,
    threshold: int = 240,
    soft_range: int = 20,
) -> None:
    """
    Harter Schwellwert + weicher Übergangsbereich. Ideal für Logos/Icons.

    - Pixel deren RGB-Kanäle ALLE >= `threshold` sind → vollständig transparent.
    - Pixel im Bereich [threshold - soft_range, threshold) werden weich
      ausgeblendet, damit die Kanten nicht hart wirken.
    """
    img = Image.open(image_path).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)

    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    # Der "dunkelste" Kanal eines Pixels bestimmt, wie weit es von Weiß entfernt ist.
    min_channel = np.minimum(np.minimum(r, g), b).astype(np.int16)

    lower = threshold - soft_range
    new_alpha = a.astype(np.int16).copy()

    fully_transparent_mask = min_channel >= threshold
    soft_mask = (min_channel >= lower) & (min_channel < threshold)

    new_alpha[fully_transparent_mask] = 0
    soft_values = ((threshold - min_channel[soft_mask]) / max(soft_range, 1)) * 255
    new_alpha[soft_mask] = np.clip(soft_values, 0, 255).astype(np.int16)

    arr[..., 3] = np.clip(new_alpha, 0, 255).astype(np.uint8)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(arr, mode="RGBA").save(output_path, format="PNG", optimize=True)
    print(f"  ✔ [threshold] {image_path.name}  →  {output_path.relative_to(PROJECT_ROOT)}")


def remove_white_background_luminance(
    image_path: Path,
    output_path: Path,
    white_point: int = 250,
) -> None:
    """
    Alpha-aus-Luminanz: Behandelt das Bild als "dunkler Inhalt über weißem Grund"
    und rechnet den Weißanteil jedes Pixels mathematisch heraus. Kein Pixel geht
    verloren — jeder Sprenkel bleibt als halbtransparenter Dot erhalten.

    Modell:
        observed = alpha * content + (1 - alpha) * white
      →  alpha    = (white - max(r,g,b)) / white        (auf 0..1 normiert)
      →  content  = (observed - white*(1-alpha)) / alpha

    Dadurch bleiben:
      • sehr dunkle Pixel → hohe Deckkraft, Originalfarbe erhalten
      • mittelhelle Sprenkel → mittlere Deckkraft, Farbe leicht gesättigt
      • hellgraue Punkte → niedrige Deckkraft, aber noch sichtbar
      • reiner Hintergrund (≥ white_point) → komplett transparent
    """
    img = Image.open(image_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)

    rgb = arr[..., :3]
    orig_alpha = arr[..., 3:4]

    # Alpha aus Helligkeit: je dunkler der hellste Kanal, desto opaker.
    brightness = rgb.max(axis=-1, keepdims=True)        # (H, W, 1)
    alpha_norm = np.clip((white_point - brightness) / float(white_point), 0.0, 1.0)

    # "Un-Premultiply" gegen weißen Hintergrund, um die echte Content-Farbe zu bekommen.
    # Für pixel mit alpha≈0 einfach weiß lassen (sie werden eh unsichtbar).
    safe_alpha = np.where(alpha_norm > 1e-3, alpha_norm, 1.0)
    white = np.array([255.0, 255.0, 255.0], dtype=np.float32)
    content = (rgb - white * (1.0 - safe_alpha)) / safe_alpha
    content = np.clip(content, 0.0, 255.0)

    out = np.zeros_like(arr)
    out[..., :3] = content
    # Alpha mit dem Originalalphabild multiplizieren (falls Quelle schon RGBA war)
    out[..., 3:4] = alpha_norm * orig_alpha

    out = np.clip(out, 0, 255).astype(np.uint8)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, mode="RGBA").save(output_path, format="PNG", optimize=True)
    print(f"  ✔ [luminance] {image_path.name}  →  {output_path.relative_to(PROJECT_ROOT)}")


def collect_inputs(paths: list[str]) -> list[Path]:
    """
    Wenn keine Pfade übergeben wurden → alle Bilder aus `DEFAULT_INPUT_DIR`.
    Sonst → nur die explizit angegebenen Dateien.
    """
    if paths:
        return [Path(p).resolve() for p in paths]

    if not DEFAULT_INPUT_DIR.exists():
        return []

    return sorted(
        p for p in DEFAULT_INPUT_DIR.iterdir()
        if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Weißen Hintergrund aus Bildern entfernen.")
    parser.add_argument("files", nargs="*", help="Einzelne Bilddateien (optional).")
    parser.add_argument(
        "-o", "--out-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help=f"Zielordner (default: {DEFAULT_OUTPUT_DIR.relative_to(PROJECT_ROOT)})",
    )
    parser.add_argument("-m", "--mode", choices=["threshold", "luminance"], default="threshold",
                        help="Verarbeitungsmodus (default: threshold).")
    parser.add_argument("-t", "--threshold", type=int, default=240,
                        help="[threshold-Modus] RGB-Schwellwert für Weiß (0-255, default 240).")
    parser.add_argument("-s", "--soft-range", type=int, default=20,
                        help="[threshold-Modus] Breite des weichen Alpha-Übergangs (default 20).")
    parser.add_argument("--white-point", type=int, default=250,
                        help="[luminance-Modus] Helligkeitswert für Weiß (default 250).")
    args = parser.parse_args()

    out_dir = Path(args.out_dir).resolve()
    inputs = collect_inputs(args.files)

    if not inputs:
        print("Keine Eingabebilder gefunden.")
        print(f"→ Lege Bilder in '{DEFAULT_INPUT_DIR.relative_to(PROJECT_ROOT)}/' ab")
        print("  oder übergib sie als Argumente.")
        return 1

    print(f"Verarbeite {len(inputs)} Bild(er) [Modus: {args.mode}] → {out_dir.relative_to(PROJECT_ROOT)}/")
    for src in inputs:
        if not src.exists():
            print(f"  ✗ {src} existiert nicht, übersprungen")
            continue
        dest = out_dir / f"{src.stem}.png"
        if args.mode == "threshold":
            remove_white_background_threshold(src, dest, args.threshold, args.soft_range)
        else:
            remove_white_background_luminance(src, dest, args.white_point)

    print("Fertig.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
