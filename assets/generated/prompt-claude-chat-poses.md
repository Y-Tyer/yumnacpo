# Paste this into Claude chat (or Cowork) with the Higgsfield connector enabled

Generate seven more poses of an approved line-drawn figure using the Higgsfield tools, spending my **unlimited trial allowance, not credits**. Do not write code.

## Already on my Higgsfield account (reuse by ID, do not re-upload)

- Approved figure, pose F0 (job ID, use as the figure reference): `bc056480-da14-46c7-a986-8e70f0cfad71`
- Style reference (media ID): `d426a46c-0cf8-4a7c-943f-b2b699d83a61`

## Before generating anything

1. Call `models_explore` for `gpt_image_2_6` and read which configurations my unlimited allowance covers. Tell me which model, quality and resolution you will use. Prefer `gpt_image_2_6`; if the allowance does not cover it, tell me which covered model you would use instead and wait for my answer.
2. When the tool asks which balance to use, choose the **allowance (`use_unlim: true`)**, never credits. If any request would fall back to credits, stop and ask me.
3. Unlimited requests make one image each, so use `generate_image_batch` with one request per pose (up to 12 per call), then `jobs_wait`. On a timeout, check job status before resubmitting.

## Every request

- Aspect ratio 9:16.
- Reference images: the F0 job ID above plus the style reference media ID.
- Prompt = the pose text below, then the identity instruction, then the style block.

**Identity instruction (append after each pose):**
the identical woman, face, hair, hairstyle, proportions, line style and scale as the first reference image; only the pose changes; feet stay at the same position in the frame.

**Style block (append last):**
Elegant minimal line drawing of a woman in the hand of the reference: fine flowing lines of even weight in mauve `#c3819b` with a few deeper plum `#644473` strokes, on a flat off-white `#fbf7f9` background. Front-facing, full body from head to feet, fully in frame and centred with generous margin. Only a few lines suggest the curves and contours of the body; most of the form is left open. The face is drawn with very few lines and reads as serene, beautiful and elegant. No vines, no leaves, no flowers, no veins, no pattern inside the body. No shading, no fill, no gradient, no texture, no text, no border. Tasteful and non-explicit: a graceful abstract silhouette.

## The seven poses

Together they read as one slow dance. Each draws attention to a body region by gesture and gaze. Movements are small and graceful, never athletic or theatrical.

| ID | Region | Pose |
|---|---|---|
| F1 | Chest | One hand resting lightly over the heart, the other arm soft at her side, chin slightly lifted. |
| F2 | Back and core | Slight turn of the torso, both hands resting at the waist and lower back, spine long. |
| F3 | Arm and wrist | One arm extended gracefully to the side at shoulder height, the other hand touching its wrist, gaze following the arm. |
| F4 | Knee | One knee softly raised and bent, the hand on that side reaching down to rest on it, gaze lowered to the knee. |
| F5 | Leg | One leg extended forward with the toe pointed on the floor, like a dancer's tendu, the same-side arm sweeping down along the leg. |
| F6 | Foot and ankle | Rising slightly onto the ball of one foot, heel lifted, both arms low and open, gaze down to the feet. |
| F7 | Whole body (mobility) | Open, forward-stepping pose with both arms spread wide and welcoming, head up. |

## Rules

- No lettering, logos or watermarks in any image.
- Do not put a person's name, phone number or email in any prompt or `context` field.
- Do not run `remove_background`; I make cutouts locally.
- Show all seven results once with a single `show_generation_by_ids` call.
- Judge each against F0 and tell me plainly which drift: face, hair, line weight or colour, proportions, or feet position. Do not regenerate anything without asking me first.
- When done, list the job ID for each pose (F1 to F7) so I can download them.
- My trial ends 15 Nov 2026 at 18:44 UTC, so do this now.
