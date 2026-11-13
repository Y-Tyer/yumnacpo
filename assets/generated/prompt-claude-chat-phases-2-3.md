# Paste this into Claude chat (or Cowork) with the Higgsfield connector enabled

Generate two sets of flat-colour illustrations for a website using the Higgsfield tools, spending my **unlimited trial allowance, not credits**. Do not write code. There are two phases, and each starts with one style sample that I must approve before you generate the rest.

## Before generating anything

1. Call `models_explore` for `gpt_image_2_6` and read which configurations my unlimited allowance covers. Tell me the model, quality and resolution you will use. Prefer `gpt_image_2_6` at the highest quality the allowance covers; if it is not covered, name the covered model you would use and wait for my answer.
2. When asked which balance to use, choose the **allowance (`use_unlim: true`)**. If a request would fall back to credits, stop and ask me.
3. Unlimited requests make one image each. For the batches use `generate_image_batch` with one request per image (up to 12 per call), then `jobs_wait`. On a timeout, check job status before resubmitting.
4. Do not run `remove_background` and do not set `background: transparent`; I make cutouts locally.

## Rules for every image

- No lettering, labels, logos, brand names or watermarks.
- Do not put anyone's name, phone number or email in a prompt or `context` field.
- Show each batch once with a single `show_generation_by_ids` call.
- After each batch, tell me plainly which images look weak (wrong shape, extra parts, text, off-palette colours, outline not fully closed) and why. Never regenerate anything without asking me first.
- Finish each phase by listing the job ID for every image, with its ID (P01, W01 and so on).
- My trial ends 15 Nov 2026 at 18:44 UTC, so do this now.

---

# Phase 2: product images (15)

One product per image, alone, shown on a plain flat background. I place each on a colour tile in code.

**Product style block (append to every prompt in this phase):**
Flat-colour illustration of a single medical support product, alone, in three-quarter view. Bold simple shapes with a thin deep plum `#2e1f38` outline and minimal interior detail. Palette limited to plum `#644473`, mauve `#c3819b`, blush `#f3dfe6`, marigold `#f2b84b`, sage `#8fb89a` and white. Plain flat off-white `#fbf7f9` background. Generic unbranded design. No person, no body parts, no hands, no text, no logo, no shadow, no gradient. Friendly, clear, modern editorial illustration. The outline is fully closed and unbroken, the product sits well inside the frame with a wide margin, and nothing touches the edges.

All 1:1.

**Step 1.** Generate **P01 only**, show it to me, and wait. Its job ID becomes `PRODUCT_REF`. **Step 2**, after I approve: generate P02 to P15 in one or two batches, each with `PRODUCT_REF` as an image reference to keep the style identical.

| ID | Product (the prompt, before the style block) |
|---|---|
| P01 | Hinged knee brace with side hinges and four straps. |
| P02 | Slim osteoarthritis unloader knee brace with a single side upright. |
| P03 | Long post-operative knee brace with thigh and calf cuffs and a range-of-motion dial. |
| P04 | A teardrop-shaped silicone breast prosthesis form. |
| P05 | A post-mastectomy bra with pocketed cups and wide straps. |
| P06 | Lumbar spinal brace: wraparound belt, rigid back panel, front closure. |
| P07 | Post-surgical compression garment: high-waisted abdominal binder with front hooks. |
| P08 | Wrist and forearm fracture splint with three straps. |
| P09 | Medical compression arm sleeve. |
| P10 | Below-knee prosthetic leg: socket, slim pylon, foot. |
| P11 | A pair of knee-high medical compression stockings. |
| P12 | A pair of diabetic therapeutic shoes: wide deep toe box, soft upper, strap closure. |
| P13 | Fracture walker boot with rigid shell and straps. |
| P14 | Lightweight manual wheelchair. |
| P15 | Folding walking frame with a pair of elbow crutches beside it. |

---

# Phase 3: without / with illustrations (15)

One image per product, each a **single image split into two equal halves**: left half without the support, right half the same person in the same pose and framing with it. Generating both halves in one image keeps them consistent.

**Pair style block (append to every prompt in this phase):**
Flat-colour editorial illustration in two equal side-by-side panels with a clean vertical division. Both panels show the same faceless adult in the same framing. Bold simple shapes with a thin deep plum `#2e1f38` outline. Left panel background blush `#f3dfe6`; right panel background sage `#8fb89a`. Figures in plum `#644473` and mauve `#c3819b`; the support product in marigold `#f2b84b` so it is the brightest thing in the image. The left panel is honest but never pitiful: no pain marks, no red, no distress, no tears. The right panel is steadier and more at ease, not miraculous. Respectful, warm, dignified. No text, no labels, no arrows, no logos.

All 3:2. Vary the figures across the set in age, build, skin tone and gender, except W04 and W05, which show a woman.

**Step 1.** Generate **W01 only**, show it to me, and wait. Its job ID becomes `PAIR_REF`. **Step 2**, after I approve: generate W02 to W15 in one or two batches, each with `PAIR_REF` as an image reference for the style (the people and poses change).

Prompt = "Left panel: *[without]*. Right panel: *[with]*." then the pair style block.

| ID | For | Left: without | Right: with |
|---|---|---|---|
| W01 | P01 | Person standing, one knee buckling slightly inward, hand out for balance. | Same stance with a hinged knee brace, knee aligned, arms relaxed. |
| W02 | P02 | Older person on a stair, hesitating, hand gripping the rail. | Same step with a slim knee brace, climbing steadily. |
| W03 | P03 | Person seated, one leg held stiffly out, unsure how to stand. | Same person standing with a long knee brace, upright. |
| W04 | P04 | Clothed woman in a simple fitted top, three-quarter view, chest contour uneven, shoulders drawn in. | Same woman with an even chest contour, shoulders open. No product visible; the top fits evenly. |
| W05 | P05 | Clothed woman adjusting a top that sits unevenly. | Same woman, top sitting smoothly, a marigold strap just visible at the shoulder. |
| W06 | P06 | Person standing side-on, shoulders rounded, hand at the lower back. | Same person wearing a lumbar brace, upright. |
| W07 | P07 | Person standing guardedly, arm held across the abdomen. | Same person wearing a compression garment under an open shirt, standing easily. |
| W08 | P08 | Person cradling one forearm against the body. | Same person with a wrist splint, arm relaxed, holding a cup. |
| W09 | P09 | Person with one arm drawn noticeably fuller, held slightly away. | Same person with a compression sleeve, arm outline even, reaching for a shelf. |
| W10 | P10 | Person standing with crutches, one leg ending below the knee. | Same person walking mid-stride with a prosthetic leg, no crutches. |
| W11 | P11 | Person seated, lower legs and ankles drawn fuller, feet up on a stool. | Same person standing in compression stockings, legs even. |
| W12 | P12 | Person stepping gingerly in narrow shoes. | Same person walking comfortably in wide therapeutic shoes. |
| W13 | P13 | Person balancing on one foot, the other held off the ground. | Same person standing on both feet with a walker boot. |
| W14 | P14 | Person seated indoors by a window, looking out. | Same person outdoors in a wheelchair, moving along a path. |
| W15 | P15 | Person standing, holding on to a chair back. | Same person walking with a walking frame. |
