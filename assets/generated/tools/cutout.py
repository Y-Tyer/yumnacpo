"""Cutout for the line-drawn figure poses.

Lines: colour-to-alpha. The flat off-white ground becomes transparent and the
true line colour is recovered, so thin anti-aliased strokes stay soft with no
light fringe.

Garment fill (--opaque-fill): the pale blush tint inside the garment would
otherwise come out about 20% opaque, so the tile colour would show through the
garment. With this flag, every tinted area enclosed by lines (not reachable
from the image border through the ground colour) is kept fully opaque in its
original colour, together with the seams and the inner half of its outline.
Enclosed areas of plain ground colour (face, neck, hands, feet) stay
transparent, as does the ground outside the figure.

    python -I cutout.py INPUT OUTPUT.png [--source SOURCE.png] [--opaque-fill]

--source also writes the untouched image, converted to PNG, on its ground.
Needs: pillow, numpy, and scipy for --opaque-fill.
"""
import argparse
import numpy as np
from PIL import Image

LOW, HIGH = 0.035, 0.30  # ground noise floor, and the strength that counts as fully opaque


def cutout(img, opaque_fill=False):
    a = np.asarray(img.convert("RGB")).astype(np.float64)
    border = np.concatenate([a[:30].reshape(-1, 3), a[-30:].reshape(-1, 3),
                             a[:, :30].reshape(-1, 3), a[:, -30:].reshape(-1, 3)])
    ground = np.median(border, axis=0)
    strength = np.max((ground - a) / ground, axis=2)
    alpha = np.clip((strength - LOW) / (HIGH - LOW), 0, 1)
    ua = np.maximum(alpha, 0.08)[..., None]
    rgb = np.clip((a - (1 - ua) * ground) / ua, 0, 255)
    rgb[alpha <= 0] = 0
    info = {"ground": ground.round().astype(int).tolist()}

    if opaque_fill:
        from scipy import ndimage as ndi
        k = (a.shape[1] / 1520.0) ** 2                     # area thresholds are tuned at 1520 px wide
        groundish = strength < 0.05
        lab, n = ndi.label(groundish)
        edge_labels = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
        outside = np.isin(lab, edge_labels[edge_labels > 0])
        # Skin (face, neck, hands, feet) is large enclosed ground colour. Smaller
        # ground-coloured patches are either faded spots in the garment or gaps
        # between hair strands and fingers; the rules below tell those apart.
        gsizes = ndi.sum(groundish, lab, index=np.arange(1, n + 1))
        skin = np.isin(lab, np.arange(1, n + 1)[gsizes >= 1500 * k]) & ~outside
        real_ground = outside | skin

        cand = ~real_ground & (strength < 0.25) & ~ndi.binary_dilation(real_ground, iterations=2)
        clab, n = ndi.label(cand)
        idx = np.arange(1, n + 1)
        csizes = ndi.sum(cand, clab, index=idx)
        main = np.isin(clab, idx[csizes >= 3000 * k])      # body, sleeves, legs
        # cuffs and other small panels: tinted, and right next to the main garment
        near = ndi.binary_dilation(main, iterations=16)
        touching = np.unique(clab[near & cand])
        tinted = idx[(csizes >= 150 * k) & (ndi.median(strength, clab, index=idx) > 0.05)]
        core = main | np.isin(clab, np.intersect1d(touching, tinted))

        solid = ndi.binary_dilation(core, iterations=3)    # reach into seams and outline
        solid &= ~ndi.binary_dilation(real_ground, iterations=1)
        rgb[solid] = a[solid]
        alpha[solid] = 1.0
        info["fill"] = np.median(a[core], axis=0).round().astype(int).tolist()
        info["fill_px"] = int(solid.sum())

    out = np.dstack([rgb, alpha * 255]).round().astype(np.uint8)
    return Image.fromarray(out, "RGBA"), info


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("input")
    p.add_argument("output")
    p.add_argument("--source")
    p.add_argument("--opaque-fill", action="store_true")
    args = p.parse_args()
    im = Image.open(args.input)
    if args.source:
        im.convert("RGB").save(args.source, optimize=True)
    out, info = cutout(im, args.opaque_fill)
    out.save(args.output, optimize=True)
    print(args.output, out.size, info)
