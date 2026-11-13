"""Cutout for the flat-colour product illustrations (phase 2).

The products are solid shapes with a dark outline on a flat off-white ground,
and some of their fills are white or very pale. So instead of colour-to-alpha
over the whole image (which would make pale fills see-through), this:

1. finds the ground around the object, and the ground showing through gaps
   inside it (wheel spokes, frame openings, strap loops), and makes it
   transparent. Enclosed areas count as gaps only if their median colour is
   the ground colour, so near-white fills (buckles, soles) stay solid;
2. keeps everything else fully opaque, so white and pale fills stay solid;
3. softens the edge: in a 5 px band around the transparent areas, each pixel
   is unmixed into the ground and the colour of the nearest solid pixel,
   so the outline keeps its anti-aliasing with no light fringe or tint.

    python -I cutout_product.py INPUT OUTPUT.png [--source SOURCE.png]

--source also writes the untouched image, converted to PNG.
Needs: pillow, numpy, scipy.
"""
import argparse
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

GROUND_TOL = 7      # max per-channel difference that still counts as ground

EDGE = 5            # px of soft edge; the dark outline is wider, so fills are untouched


def cutout(img):
    a = np.asarray(img.convert("RGB")).astype(np.float64)
    border = np.concatenate([a[:20].reshape(-1, 3), a[-20:].reshape(-1, 3),
                             a[:, :20].reshape(-1, 3), a[:, -20:].reshape(-1, 3)])
    ground = np.median(border, axis=0)
    diff = np.abs(a - ground).max(axis=2)
    groundish = diff < GROUND_TOL

    # (no opening: small ground slivers in tight corners must clear too; the
    # median test below keeps noise inside white fills from being cleared)
    lab, n = ndi.label(groundish)
    idx = np.arange(1, n + 1)
    sizes = ndi.sum(groundish, lab, index=idx)
    # The background around the object is always clear. An enclosed area is only
    # clear (ground seen through a gap) if its typical colour really is the
    # ground colour: the white fills here are just a few levels off it (the
    # ground is slightly pink, the white is neutral), so judge by the median.
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    med = np.stack([ndi.median(a[..., c], lab, index=idx) for c in range(3)], axis=1)
    is_ground = np.abs(med - ground).max(axis=1) < 3
    keep = np.isin(idx, edge) | is_ground
    clear = np.isin(lab, idx[keep])

    alpha = np.ones(a.shape[:2])
    rgb = a.copy()
    alpha[clear] = 0.0
    rgb[clear] = 0

    # Edge: unmix each band pixel as a blend of the ground and the colour of the
    # nearest solid pixel. Alpha is how far it sits from the ground towards that
    # colour; its colour becomes that solid colour, so no tint or fringe is left.
    band = ndi.binary_dilation(clear, iterations=EDGE) & ~clear
    solid = ~clear & ~band
    _, (iy, ix) = ndi.distance_transform_edt(~solid, return_indices=True)
    fg = a[iy[band], ix[band]]
    v = fg - ground
    t = ((a[band] - ground) * v).sum(axis=1) / np.maximum((v * v).sum(axis=1), 1.0)
    weak = (v * v).sum(axis=1) < 20 ** 2           # nearest solid is near-white: keep as is
    ba = np.where(weak, 1.0, np.clip(t, 0, 1))
    rgb[band] = np.where(weak[:, None], a[band], fg)
    alpha[band] = ba

    out = np.dstack([rgb, alpha * 255]).round().astype(np.uint8)
    info = {"ground": ground.round().astype(int).tolist(),
            "clear_regions": int(keep.sum()),
            "opaque_px": int((alpha == 1).sum())}
    return Image.fromarray(out, "RGBA"), info


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("input")
    p.add_argument("output")
    p.add_argument("--source")
    args = p.parse_args()
    im = Image.open(args.input)
    if args.source:
        im.convert("RGB").save(args.source, optimize=True)
    out, info = cutout(im)
    out.save(args.output, optimize=True)
    print(args.output.split("/")[-1], out.size, info)
