# Paste this into Claude chat (or Cowork) with the Higgsfield connector enabled

Redraw eight existing poses of a line-drawn figure so she wears a full-body compression garment, using the Higgsfield tools and spending my **unlimited trial allowance, not credits**. Do not write code.

I am happy with the current drawings. This is a careful redraw, not a redesign: keep each pose, the face, the hair, the line style and the framing, add the garment, and make only the small pose fixes listed below. The video model flagged the current figure as unclothed, so the garment must clearly read as clothing.

## Already on my Higgsfield account (reuse by media ID, do not re-upload)

| Pose | Region | Current image (media ID) |
|---|---|---|
| F0 | rest | `c074dbb5-1273-47f4-a80d-4b3c325eadcf` |
| F1 | chest | `ae5c0212-a552-428b-b0b9-71937f69701c` |
| F2 | back and core | `4236ca67-7d1e-4234-a4cf-10e3361048f4` |
| F3 | arm and wrist | `720a3416-f60e-4043-9a50-8542c455dce9` |
| F4 | knee | `ad4d5531-045c-453f-9123-750053fadb37` |
| F5 | leg | `bd0f21a7-3e88-4597-a2f0-c31521741186` |
| F6 | foot and ankle | `3e7772ee-8755-4f32-aedd-c90f1a5af722` |
| F7 | whole body | `88a2783e-78d1-4335-a526-845de01f99ab` |

## Before generating anything

1. Call `models_explore` for `gpt_image_2_6` and read which configurations my unlimited allowance covers. Tell me the model, quality and resolution you will use. Use the highest quality the allowance covers.
2. When asked which balance to use, choose the **allowance (`use_unlim: true`)**. If a request would fall back to credits, stop and ask me.
3. Unlimited requests make one image each. Use `generate_image_batch` with one request per pose, then `jobs_wait`. On a timeout, check job status before resubmitting.
4. Do not run `remove_background`; I make cutouts locally.

## Garment block (append to every prompt)

She wears a full-body medical compression garment: a smooth, close-fitting suit from the collarbones to the ankles, with long sleeves ending at the wrists. Draw it in the same fine line style as the reference: a soft scoop neckline, slim cuffs at the wrists and ankles, and one or two gentle seam lines that follow the body. Fill the garment with a very pale flat blush tint `#f3dfe6`; the face, neck, hands and bare feet stay unfilled line. The garment softens the body's contours and shows no anatomical detail. It reads as modest, supportive medical wear, not lingerie, swimwear or a costume. No pattern, logo, zip, label or text on it.

## Style block (append after the garment block)

Elegant minimal line drawing in the hand of the reference: fine flowing lines of even weight in mauve `#c3819b` with a few deeper plum `#644473` strokes, on a flat off-white `#fbf7f9` background. Keep the identical face, hair, hairstyle, proportions, line weight and scale as the reference. Front-facing, full body from head to feet, centred, with the feet in the same place in the frame as in the F0 reference. Leave a clear margin of at least one tenth of the image width on both sides; no hand, foot or hair comes near an edge. No vines, leaves or flowers. No shading, gradient, texture, text or border; the only fill is the garment's pale tint. A modest, non-sexual illustration for a medical clinic's website.

---

## Step 1: F0 only (the new reference)

Generate **F0 only**, show it to me, and wait for my approval.

- Aspect ratio 9:16.
- Image reference: the current F0 (`c074dbb5-1273-47f4-a80d-4b3c325eadcf`).
- Prompt: "Redraw the reference image exactly, same pose, face, hair and framing, adding the garment below." then the garment block and the style block.

Its job ID becomes `F0G`. Every other pose uses it so the garment matches across the set.

## Step 2: F1 to F7 (after I approve F0)

Generate all seven in one batch.

- Aspect ratio 9:16.
- Image references, in this order: **`F0G` first** (for the face, hair, garment and line style), then **that pose's current image** (for the pose).
- Prompt: "Redraw the pose of the second reference image as the same woman wearing the same garment as in the first reference image. Keep the pose as it is, except for these changes: *[the change from the table, or 'none']*." then the garment block and the style block.

| Pose | Change to the pose |
|---|---|
| F1 chest | None. |
| F2 back and core | Turn the torso slightly to one side, and move one hand from the hip to rest on the lower back, so the gesture points to the back and core rather than the hips. |
| F3 arm and wrist | Keep the body centred with the feet where they are in F0. The head stays mostly front-facing, turned only gently toward the raised arm, so the hair bun stays on the same side as in F0. Bend the raised arm slightly at the elbow so the hand stays well inside the frame. |
| F4 knee | Make the raised knee unmistakable: the thigh lifts forward, the knee bends, and the foot clears the floor beside the standing ankle. The hand still rests on the knee. |
| F5 leg | Point the extended leg forward and only slightly to the side, like a dancer's tendu, toe on the floor well inside the frame. Keep the arm clear of the leg so their lines do not overlap. |
| F6 foot and ankle | None. |
| F7 whole body | Lower the arms slightly and bring them a little closer to the body, still open and welcoming, so the hands sit well inside the frame. |

## Checks, and rules

- Show the result of each step once with a single `show_generation_by_ids` call.
- Judge each image against `F0G` and its current pose, and tell me plainly which drift: face, hair, line weight or colour, garment (missing, different, patterned, or reading as lingerie or swimwear), proportions, feet position, or a hand or foot near the edge. Never regenerate anything without asking me first.
- No lettering, logos or watermarks. Do not put anyone's name, phone number or email in a prompt or `context` field.
- When done, list the job ID for each pose: F0G and F1 to F7.

## Then the clips

Once I approve all eight, run the transition clips from my phase 4 prompt (`prompt-claude-chat-phase-4-clips.md`), using these eight new job IDs as the frames. My trial ends 15 Nov 2026 at 18:44 UTC, so do this now.
