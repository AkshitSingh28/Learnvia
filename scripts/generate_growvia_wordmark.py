from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".codex-tmp" / "py"))

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont


TEXT = "Growvia"
SPLIT_AT = 4
FONT_SIZE = 118
LETTER_SPACING_PX = -3


def build_paths(font_path: Path) -> tuple[str, str, str]:
    font = TTFont(str(font_path))
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    os2 = font["OS/2"]
    upm = font["head"].unitsPerEm

    ascent = int(os2.sTypoAscender)
    descent = int(os2.sTypoDescender)
    height = ascent - descent
    letter_spacing = LETTER_SPACING_PX / FONT_SIZE * upm

    x = 0.0
    grow_paths: list[str] = []
    via_paths: list[str] = []

    for index, char in enumerate(TEXT):
        glyph_name = cmap[ord(char)]
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        transform_pen = TransformPen(pen, (1, 0, 0, -1, x, ascent))
        glyph.draw(transform_pen)

        path = pen.getCommands()
        if path:
            if index < SPLIT_AT:
                grow_paths.append(path)
            else:
                via_paths.append(path)

        x += hmtx[glyph_name][0]
        if index < len(TEXT) - 1:
            x += letter_spacing

    view_box = f"0 0 {int(round(x))} {height}"
    return view_box, " ".join(grow_paths), " ".join(via_paths)


def write_svg(path: Path, view_box: str, grow_path: str, via_path: str, grow_fill: str, grad_id: str, start: str, end: str) -> None:
    width = int(view_box.split()[2])
    height = int(view_box.split()[3])
    path.write_text(
        f"""<svg width="560" height="150" viewBox="{view_box}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Growvia">
  <title>Growvia</title>
  <defs>
    <linearGradient id="{grad_id}" x1="{int(width * 0.55)}" y1="{height}" x2="{width}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="{start}"/>
      <stop offset="1" stop-color="{end}"/>
    </linearGradient>
  </defs>
  <path fill="{grow_fill}" d="{grow_path}"/>
  <path fill="url(#{grad_id})" d="{via_path}"/>
</svg>
""",
        encoding="utf-8",
    )


def main() -> None:
    view_box, grow_path, via_path = build_paths(ROOT / "src" / "fonts" / "Poppins-ExtraBold.ttf")
    write_svg(ROOT / "public" / "growvia-wordmark.svg", view_box, grow_path, via_path, "#0D1117", "gv-word", "#4B57F6", "#8B5CF6")
    write_svg(ROOT / "public" / "growvia-wordmark-white.svg", view_box, grow_path, via_path, "#FFFFFF", "gv-word-w", "#6E78FF", "#A78BFA")
    print(f"Generated outlined Growvia wordmarks with viewBox {view_box}")


if __name__ == "__main__":
    main()
