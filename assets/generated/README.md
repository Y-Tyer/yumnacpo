# Generated assets

Phase 1 (the figure) is done, with the figure wearing a full-body compression garment. Phase 2 (product images) is done. Phase 3 (without / with pairs) is a placeholder for now. Phase 4 (transition clips) is generated; two of the seven clips have a hand leaving the frame.

## Phase 1: figure poses

Transparent PNG cutouts, 1520 x 2688 (9:16), made from the full-size Higgsfield originals. The untouched images on their off-white ground are in `source/` (same filenames); use those as start and end frames for any transition clips.

| File | Region |
|---|---|
| `figure-00-rest.png` | none (opening pose) |
| `figure-01-chest.png` | Chest |
| `figure-02-back-core.png` | Back and core |
| `figure-03-arm-wrist.png` | Arm and wrist |
| `figure-04-knee.png` | Knee |
| `figure-05-leg.png` | Leg |
| `figure-06-foot.png` | Foot and ankle |
| `figure-07-whole.png` | Whole body (mobility) |

### How they were made

1. **Unclothed set (superseded).** F0 was generated with `gpt_image_2_6` (high, 2k), job `bc056480-da14-46c7-a986-8e70f0cfad71`, from the logo figure with the name cropped out. F1 to F7 were generated in Claude chat from F0 with `prompt-claude-chat-poses.md`. The video model flagged this set as unclothed, so it was replaced.
2. **Garment set (current).** All eight were redrawn in Claude chat on the unlimited trial with `prompt-claude-chat-poses-garment.md`: F0 first from the unclothed F0, then F1 to F7 from the new F0 plus each unclothed pose, with small pose fixes. The files here are the full-size originals downloaded from Higgsfield; `source/` holds them unchanged.

| Pose | Higgsfield job ID |
|---|---|
| F0 | `d7797b75-9880-4ddc-8839-508b6a69bf0c` |
| F1 | `b88a5188-7277-4056-b1a4-f2c154b52ff9` |
| F2 | `35208be5-ae10-48fd-80a4-b4dc00e06e94` |
| F3 | `40feac5c-b151-4ec6-9525-52a83d007fd3` |
| F4 | `6ee8e77e-179c-4007-9da6-331416a89da6` |
| F5 | `8d600b2c-7f53-4a1d-b902-9d869813f98c` |
| F6 | `6e4dcbd9-2c5c-4b8a-9858-89e5f60f0ff7` |
| F7 | `fa76bbf1-20bc-4147-be65-cfb62934497c` |

### Cutout method

`tools/cutout.py --opaque-fill` (Pillow, NumPy, SciPy):

- **Lines:** colour-to-alpha. The off-white ground becomes transparent and the true line colour is recovered, with no light fringe.
- **Garment:** the large tinted areas (body, sleeves, legs) and the tinted cuffs next to them are kept fully opaque, so tiles don't show through the suit. Small tinted patches elsewhere, such as between hair strands, are not treated as garment.
- **Skin:** the face, neck, hands and feet are unfilled in the drawing, so they stay transparent and take the colour of whatever is behind them, as before. Where a hand lies over the garment (F1, F2, F3, F4), the tile shows inside the hand outline. On the off-white page this is invisible; on a coloured tile it reads as a cut-out hand.

Checked on all eight on a plum tile: nothing touches the borders, the garment and cuffs are solid with clean edges, and the hair, face, hands and feet are clear. `tools/cutout.ps1` is the older line-only method for PNG input. `tools/rig.html`, `poses.js` and `render.ps1` are an unfinished experiment in re-posing F0 locally; nothing depends on them.

### Review against the requested fixes

Measured on 1131 px wide copies (multiply by 1.34 for the full-size files), compared with F0 and with the unclothed set:

| Pose | Requested fix | Result |
|---|---|---|
| F0, F1, F6 | None | Pose, face, hair and framing unchanged. |
| F2 back and core | Torso turn, one hand to the lower back | **Not applied.** Still both hands on the hips, front-on. |
| F3 arm and wrist | Centre the body, keep head front-facing and bun on its side, keep the hand in frame | **Partly.** The hand now has a 116 px margin (was 35). The body is still about 78 px left of centre at the feet and 138 px at the head, and the head still turns so the bun is on the other side. |
| F4 knee | Make the raised knee clear | **Fixed.** The thigh lifts, the knee bends and the foot clears the floor. |
| F5 leg | Leg forward like a tendu, inside the frame, clear of the arm | **Mostly.** The toe now has a 135 px margin (was 83) and the arm no longer overlaps the leg. The leg still extends sideways more than forward. |
| F7 whole body | Hands inside a generous margin | **Fixed in practice.** Margins are now 93 and 106 px (were 16 and 17), a little under the one-tenth target of 113. |

All eight wear the same garment: scoop neckline, cuffs at wrists and ankles, side seams, pale blush tint, no pattern or text. The hair is the same side bun as before.

## Phase 2: product images

Transparent PNG cutouts, 2048 x 2048 (1:1), for the product cards. Generated in Claude chat on the unlimited trial with `prompt-claude-chat-phases-2-3.md`; the Higgsfield job IDs were not recorded. The untouched images are in `source/` under the same names.

| ID | File | Region | Review |
|---|---|---|---|
| P01 | `product-knee-injury-brace.png` | Knee | Good: hinged brace, side hinges, four straps. |
| P02 | `product-knee-oa-brace.png` | Knee | **Wrong type.** Near-identical to P01 (straps on both sides, two hinges), not a slim brace with a single side upright. |
| P03 | `product-knee-postop-brace.png` | Knee | Good: range-of-motion dial shown. Shorter than a long post-op brace, but reads clearly. |
| P04 | `product-breast-prosthesis.png` | Chest | **Weak.** Teardrop shape, but the stripes and coloured panel make it read as a bag or case rather than a silicone form. |
| P05 | `product-mastectomy-bra.png` | Chest | Good: pocketed cups, wide straps, front hooks. |
| P06 | `product-back-brace.png` | Back and core | Good: wraparound belt, rigid back panel, front closure. |
| P07 | `product-postop-compression.png` | Back and core | Good: high-waisted binder with front hooks. |
| P08 | `product-wrist-support.png` | Arm and wrist | Acceptable: three straps and a thumb opening, but the side hinges make it read like a knee brace. |
| P09 | `product-arm-sleeve.png` | Arm and wrist | **Wrong type.** A hinged brace with straps, not a compression sleeve. |
| P10 | `product-prosthetic-leg.png` | Leg | Acceptable: socket, pylon and foot are there, but the socket has brace straps and hinges. |
| P11 | `product-compression-stocking.png` | Leg | **Wrong type.** Knee hinges and rigid uprights make these braces, not stockings. |
| P12 | `product-diabetic-shoe.png` | Foot and ankle | Good: deep toe box, strap closures. |
| P13 | `product-walker-boot.png` | Foot and ankle | Good. |
| P14 | `product-wheelchair.png` | Whole body | Good. |
| P15 | `product-walking-frame.png` | Whole body | Good: frame and a pair of crutches. |

The style is consistent across all fifteen (palette, outline, three-quarter view, no text). The weakness is that the strap-and-hinge look of the P01 style sample spread to products that should look different: P02, P09 and P11 are the wrong product type, and P04 is hard to read. All fifteen are accepted as they are.

Framing: the tall items (braces, boot, stockings, prosthetic leg, binder, sleeve) run to within 14 to 33 px of the top and bottom edges. Give the card tiles some padding in CSS so they don't touch the tile edge.

### Cutout method

`tools/cutout_product.py` (Pillow, NumPy, SciPy). Colour-to-alpha would make the white and pale fills see-through, so instead:

- **Background:** the ground around the object, and ground showing through gaps (wheel spokes, frame openings, strap loops), is made transparent. An enclosed area counts as a gap only if its median colour is the ground colour; the near-white fills (buckles, soles) are a few levels off it and stay solid.
- **Object:** everything else is fully opaque.
- **Edge:** a 5 px band is unmixed into ground and the nearest solid colour, so the outline keeps its anti-aliasing with no light fringe or tint.

Checked on marigold, sage and plum tiles, and zoomed on the wheelchair spokes and shoe sole: no fringe, and buckles and soles stay solid.

## Phase 4: pose transition clips

Generated in Claude chat on the unlimited trial with `prompt-claude-chat-phase-4-clips.md`, using the garment poses as start and end frames. The Higgsfield job IDs were not recorded. All seven are 720 x 1280, 24 fps, 97 frames (4.04 s), with no audio track.

| File | From, to | Verdict |
|---|---|---|
| `figure-move-00-01.mp4` | F0 to F1 | Good. Small, direct movement. |
| `figure-move-01-02.mp4` | F1 to F2 | **Hand leaves the frame.** The far arm swings up over the head and out to the right edge (frames 43 to 61) before settling on the hip. |
| `figure-move-02-03.mp4` | F2 to F3 | **Hand leaves the frame.** Both arms sweep wide and one goes past the top edge (frames 30 to 63); the head flips to face the other way. |
| `figure-move-03-04.mp4` | F3 to F4 | Usable. The head and bun flip back mid-clip, which is the F3 pose's own inconsistency. |
| `figure-move-04-05.mp4` | F4 to F5 | Good. |
| `figure-move-05-06.mp4` | F5 to F6 | Good. The hand comes within 11 px of the edge but stays in frame. |
| `figure-move-06-07.mp4` | F6 to F7 | Good. |

All seven are accepted as they are, including the two where a hand leaves the frame.

### What was checked

Every frame of every clip was decoded and measured.

- **Start and end frames:** each clip's first and last frame matches its pose image, in position and scale, to within 2 px (overlap 92% to 97%).
- **Identity:** face, hair, garment and line weight hold through all seven; no extra limbs, no shading added. The garment tint stays within 3 levels per channel inside each clip.
- **Background:** steady inside each clip (at most 3 levels of shift), but not the page colour. Decoded frames read about `#f4ecf2`, slightly darker and pinker than the stills (`#f9f4f7`) and the page (`#fbf7f9`), and it varies by a few levels from clip to clip. A browser may decode slightly differently, so judge this on the page.
- **Pose holds:** most clips start or end moving, with little or no hold on the pose.

### Using them on the page

The clips have an opaque background, not transparency, and are 720 px wide against 1520 px for the stills. A clip placed straight on the page would show as a faintly darker rectangle, and the figure would soften while moving. Options to handle in the build: blend the video with `mix-blend-mode: multiply`, or show the sharp still at each rest position and the clip only while scrolling between poses.
