# Asset generation brief for Claude Code with the Higgsfield MCP

Paste this whole file as the prompt in a Claude Code session that has the Higgsfield MCP connected, opened in this project folder.

---

## Task

Generate the illustration set for the Yumna Tyer Orthotics and Prosthetics landing page, using the Higgsfield MCP tools. Save every finished file into `assets/generated/` under the exact filename given below. Do not write or change any website code.

Read `PRODUCT.md` first for context.

## How the page uses these assets

- The page is light and colourful, in the manner of `assets/design_vibe_inspo.mp4`: a soft off-white ground, bold solid-colour sections, bright colour tiles behind cut-out images, flat-colour illustrations, and small animated details.
- The product section centres on one line-drawn figure of a woman, taken from the logo but front-facing.
- As the visitor scrolls, the figure moves through a slow, dance-like sequence of poses. Each pose draws attention to one body region.
- Beside each pose, a horizontal row of product cards shows what is offered for that region.
- Hovering or tapping a card reveals a without / with support illustration.

## Settings (change these before running if needed)

| Setting | Value |
|---|---|
| `MODEL` | `gpt_image_2_6` |
| `GROUND` | off-white `#fbf7f9` |
| `PLUM` | `#644473` (logo) |
| `DEEP_PLUM` | `#2e1f38` |
| `MAUVE` | `#c3819b` (logo) |
| `BLUSH` | `#f3dfe6` |
| `MARIGOLD` | `#f2b84b` |
| `SAGE` | `#8fb89a` |

## Rules

1. **Cost first.** Before generating anything, call `generate_image` with `get_cost: true` for one item, multiply by the 38 image generations in phases 1 to 3, and tell me the total. Wait for my approval. If the tool returns `unlim_choice`, ask me which balance to use.
2. **References, not SVG.** SVG output cannot take reference images, so generate everything as PNG with references.
3. **Hero first, alone.** Generate F0 with `generate_image` and `count: 4`. Show me the four variants and wait for me to choose one. Its job ID is `FIGURE_REF` for every other figure pose.
4. **One style sample before each batch.** Generate one product image and one without / with image first and wait for my approval. Their job IDs become `PRODUCT_REF` and `PAIR_REF`.
5. **Batch the rest.** Use `generate_image_batch` (up to 12 per call) and `jobs_wait`. Show all results once with a single `show_generation_by_ids` call.
6. **Transparent files.** Run `remove_background` on every item marked *cutout*, then check the result: lines intact, no fringe, no holes.
7. **Check ratios.** Call `models_explore` once to confirm supported aspect ratios. If one below is unsupported, use the nearest and tell me.
8. **No retries on timeout.** If a call times out, check the job status before submitting again.
9. **Privacy.** Do not put the practitioner's name, phone number or email in any prompt or `context` field. Do not upload her photograph.
10. **No text in images.** No lettering, labels, logos, brand names or watermarks in any image. The website adds all text.

## Reference upload

Upload the logo as the style reference (`LOGO_REF`) before F0. `assets/yumnacpo_logo.svg` will probably be rejected as SVG, so first render it to PNG (headless Edge or Chrome screenshot at 1140 × 960) and upload that. Use `media_upload`, PUT the bytes with curl, then `media_confirm`.

---

## Phase 1: the figure (8 images)

### Figure style block

Append to every prompt in this phase:

> Elegant minimal line drawing of a woman, in the hand of the reference logo: fine flowing lines of even weight in mauve `#c3819b` with a few deeper plum `#644473` strokes, on a flat off-white `#fbf7f9` background. Same hairstyle as the reference: hair gathered loosely and low at the nape with soft loose strands. Front-facing, full body from head to feet, fully in frame and centred with generous margin. Only a few lines suggest the curves and contours of the body; most of the form is left open. The face is drawn with very few lines and reads as serene, beautiful and elegant. No vines, no leaves, no flowers, no veins, no pattern inside the body. No shading, no fill, no gradient, no texture, no text, no border. Tasteful and non-explicit: the figure reads as a graceful abstract silhouette.

### Poses

All 9:16, cutout. F0 uses `LOGO_REF`. F1 to F7 use `FIGURE_REF` plus the instruction **"the identical woman, face, hair, proportions, line style and scale; only the pose changes; feet stay at the same position in the frame"**.

The sequence should read as one slow dance. Each pose directs attention to a body region by gesture and gaze. Movements are small and graceful, never athletic or theatrical.

| ID | Filename | Region it points to | Pose |
|---|---|---|---|
| F0 | `figure-00-rest.png` | none (opening pose) | Standing at ease, weight on one leg, arms relaxed and slightly away from the body, head tilted gently. |
| F1 | `figure-01-chest.png` | Chest | One hand resting lightly over the heart, the other arm soft at her side, chin slightly lifted. |
| F2 | `figure-02-back-core.png` | Back and core | Slight turn of the torso, both hands resting at the waist and lower back, spine long. |
| F3 | `figure-03-arm-wrist.png` | Arm and wrist | One arm extended gracefully to the side at shoulder height, the other hand touching its wrist, gaze following the arm. |
| F4 | `figure-04-knee.png` | Knee | One knee softly raised and bent, the hand on that side reaching down to rest on it, gaze lowered to the knee. |
| F5 | `figure-05-leg.png` | Leg | One leg extended forward with the toe pointed on the floor, like a dancer's tendu, the same-side arm sweeping down along the leg. |
| F6 | `figure-06-foot.png` | Foot and ankle | Rising slightly onto the ball of one foot, heel lifted, both arms low and open, gaze down to the feet. |
| F7 | `figure-07-whole.png` | Whole body (mobility) | Open, forward-stepping pose with both arms spread wide and welcoming, head up. |

---

## Phase 2: product images for the title cards (15 images)

One product per card, shown alone. The website places each cutout on a bright colour tile.

### Product style block

Append to every prompt in this phase:

> Flat-colour illustration of a single medical support product, alone, in three-quarter view. Bold simple shapes with a thin deep plum `#2e1f38` outline and minimal interior detail. Palette limited to plum `#644473`, mauve `#c3819b`, blush `#f3dfe6`, marigold `#f2b84b`, sage `#8fb89a` and white. Plain flat off-white `#fbf7f9` background. Generic unbranded design. No person, no body parts, no hands, no text, no logo, no shadow, no gradient. Friendly, clear, modern editorial illustration.

All 1:1, cutout. P01 is the style sample (rule 4); the rest use `PRODUCT_REF`.

| ID | Filename | Region | Product |
|---|---|---|---|
| P01 | `product-knee-injury-brace.png` | Knee | Hinged knee brace with side hinges and four straps. |
| P02 | `product-knee-oa-brace.png` | Knee | Slim osteoarthritis unloader knee brace with a single side upright. |
| P03 | `product-knee-postop-brace.png` | Knee | Long post-operative knee brace with thigh and calf cuffs and a range-of-motion dial. |
| P04 | `product-breast-prosthesis.png` | Chest | A teardrop-shaped silicone breast prosthesis form. |
| P05 | `product-mastectomy-bra.png` | Chest | A post-mastectomy bra with pocketed cups and wide straps. |
| P06 | `product-back-brace.png` | Back and core | Lumbar spinal brace: wraparound belt, rigid back panel, front closure. |
| P07 | `product-postop-compression.png` | Back and core | Post-surgical compression garment: high-waisted abdominal binder with front hooks. |
| P08 | `product-wrist-support.png` | Arm and wrist | Wrist and forearm fracture splint with three straps. |
| P09 | `product-arm-sleeve.png` | Arm and wrist | Medical compression arm sleeve. |
| P10 | `product-prosthetic-leg.png` | Leg | Below-knee prosthetic leg: socket, slim pylon, foot. |
| P11 | `product-compression-stocking.png` | Leg | A pair of knee-high medical compression stockings. |
| P12 | `product-diabetic-shoe.png` | Foot and ankle | A pair of diabetic therapeutic shoes: wide deep toe box, soft upper, strap closure. |
| P13 | `product-walker-boot.png` | Foot and ankle | Fracture walker boot with rigid shell and straps. |
| P14 | `product-wheelchair.png` | Whole body | Lightweight manual wheelchair. |
| P15 | `product-walking-frame.png` | Whole body | Folding walking frame with a pair of elbow crutches beside it. |

---

## Phase 3: without / with illustrations (15 images)

One image per product card, revealed on hover. Each is a **single image split into two equal halves**: the left half shows life without the support, the right half shows the same person in the same pose and framing with it. Generating both halves in one image keeps them consistent.

### Pair style block

Append to every prompt in this phase:

> Flat-colour editorial illustration in two equal side-by-side panels with a clean vertical division. Both panels show the same faceless adult in the same framing. Bold simple shapes with a thin deep plum `#2e1f38` outline. Left panel background blush `#f3dfe6`; right panel background sage `#8fb89a`. Figures in plum `#644473` and mauve `#c3819b`; the support product in marigold `#f2b84b` so it is the brightest thing in the image. The left panel is honest but never pitiful: no pain marks, no red, no distress, no tears. The right panel is steadier and more at ease, not miraculous. Respectful, warm, dignified. No text, no labels, no arrows, no logos.

All 3:2, not cutout. W01 is the style sample (rule 4); the rest use `PAIR_REF`. Vary the figures across the set in age, build, skin tone and gender, except W04 and W05, which show a woman.

| ID | Filename | For card | Left: without | Right: with |
|---|---|---|---|---|
| W01 | `pair-knee-injury.png` | P01 | Person standing, one knee buckling slightly inward, hand out for balance. | Same stance with a hinged knee brace, knee aligned, arms relaxed. |
| W02 | `pair-knee-oa.png` | P02 | Older person on a stair, hesitating, hand gripping the rail. | Same step with a slim knee brace, climbing steadily. |
| W03 | `pair-knee-postop.png` | P03 | Person seated, one leg held stiffly out, unsure how to stand. | Same person standing with a long knee brace, upright. |
| W04 | `pair-breast-prosthesis.png` | P04 | Clothed woman in a simple fitted top, three-quarter view, chest contour uneven, shoulders drawn in. | Same woman with an even chest contour, shoulders open. No product visible; the top fits evenly. |
| W05 | `pair-mastectomy-bra.png` | P05 | Clothed woman adjusting a top that sits unevenly. | Same woman, top sitting smoothly, a marigold strap just visible at the shoulder. |
| W06 | `pair-back-brace.png` | P06 | Person standing side-on, shoulders rounded, hand at the lower back. | Same person wearing a lumbar brace, upright. |
| W07 | `pair-postop-compression.png` | P07 | Person standing guardedly, arm held across the abdomen. | Same person wearing a compression garment under an open shirt, standing easily. |
| W08 | `pair-wrist-support.png` | P08 | Person cradling one forearm against the body. | Same person with a wrist splint, arm relaxed, holding a cup. |
| W09 | `pair-arm-sleeve.png` | P09 | Person with one arm drawn noticeably fuller, held slightly away. | Same person with a compression sleeve, arm outline even, reaching for a shelf. |
| W10 | `pair-prosthetic-leg.png` | P10 | Person standing with crutches, one leg ending below the knee. | Same person walking mid-stride with a prosthetic leg, no crutches. |
| W11 | `pair-compression-stocking.png` | P11 | Person seated, lower legs and ankles drawn fuller, feet up on a stool. | Same person standing in compression stockings, legs even. |
| W12 | `pair-diabetic-shoe.png` | P12 | Person stepping gingerly in narrow shoes. | Same person walking comfortably in wide therapeutic shoes. |
| W13 | `pair-walker-boot.png` | P13 | Person balancing on one foot, the other held off the ground. | Same person standing on both feet with a walker boot. |
| W14 | `pair-wheelchair.png` | P14 | Person seated indoors by a window, looking out. | Same person outdoors in a wheelchair, moving along a path. |
| W15 | `pair-walking-frame.png` | P15 | Person standing, holding on to a chair back. | Same person walking with a walking frame. |

---

## Phase 4 (optional): pose transition clips

Run only if I ask for it after phases 1 to 3 are approved. Get a separate cost estimate first.

- **Purpose:** short clips the website scrubs with scroll, so the figure glides from one pose to the next instead of cross-fading.
- **Clips:** seven, each about 3 seconds, 9:16, no audio: F0→F1, F1→F2, F2→F3, F3→F4, F4→F5, F5→F6, F6→F7.
- **Method:** call `get_workflow_instructions` and `models_explore` first, then use a `generate_video` model that accepts a start frame and an end frame. Use the approved pose images (before background removal) as those frames.
- **Prompt for each:** "The line-drawn woman moves slowly and gracefully from the first pose to the second, like a gentle dance. The line style, face, hair and proportions stay identical throughout. Static camera. Flat off-white `#fbf7f9` background that never changes. No new elements appear."
- **Filenames:** `figure-move-00-01.mp4` to `figure-move-06-07.mp4`.
- **Check:** reject any clip where the face, hair or line weight drifts, or the background colour shifts.

---

## Not for Higgsfield

Do not generate these; they come from elsewhere.

- The practitioner's portrait: a real photograph, never generated or altered.
- The logo: the supplied file, unchanged.
- Clickable body cues, pop-up labels, sparkles, squiggles and other small decorations: drawn in code.
- Instagram content: embedded from the real account. There is no YouTube channel yet.
- The per-region "learn more" content area and the testimonials section: placeholders only, no imagery.
- Patient photos or testimonials of any kind.

## When finished

1. Download every approved file into `assets/generated/` with the filenames above.
2. Write `assets/generated/README.md` listing each file, its Higgsfield job ID, and the exact prompt used.
3. Report which items you are not satisfied with and why, so I can decide on regenerations. Never regenerate without asking: each one costs credits.
