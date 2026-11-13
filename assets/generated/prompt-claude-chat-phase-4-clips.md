# Paste this into Claude chat (or Cowork) with the Higgsfield connector enabled

Generate seven short transition clips between the poses of a line-drawn figure, using the Higgsfield tools, spending my **unlimited trial allowance, not credits**. Do not write code. The website scrubs each clip with scroll so the figure glides from one pose to the next, so each clip must start exactly on one pose image and end exactly on the next.

## The frames

Use the eight approved **garment** poses (each wearing the full-body compression garment) by these job IDs. Do not use the earlier unclothed pose images.

| Pose | Region | Job ID |
|---|---|---|
| F0 | rest | `d7797b75-9880-4ddc-8839-508b6a69bf0c` |
| F1 | chest | `b88a5188-7277-4056-b1a4-f2c154b52ff9` |
| F2 | back and core | `35208be5-ae10-48fd-80a4-b4dc00e06e94` |
| F3 | arm and wrist | `40feac5c-b151-4ec6-9525-52a83d007fd3` |
| F4 | knee | `6ee8e77e-179c-4007-9da6-331416a89da6` |
| F5 | leg | `8d600b2c-7f53-4a1d-b902-9d869813f98c` |
| F6 | foot and ankle | `6e4dcbd9-2c5c-4b8a-9858-89e5f60f0ff7` |
| F7 | whole body | `fa76bbf1-20bc-4147-be65-cfb62934497c` |

## Before generating anything

1. Call `get_workflow_instructions` and `models_explore`. I need a video model that takes a **start frame and an end frame**. `seedance_2_0` does (roles `start_image` and `end_image`; `seedance_2_5` does too, in `omni_reference` mode). Prefer `seedance_2_0`.
2. Read which configurations my unlimited allowance covers, and tell me the model, mode, resolution and duration you will use before you spend anything. I do not need more than 720p. If the allowance only covers one mode (for example `fast` or `std`), use that one.
3. When asked which balance to use, choose the **allowance (`use_unlim: true`)**. If a request would fall back to credits, stop and ask me. For reference, at 720p and 4 seconds, the credit price is about 10 credits per clip in `fast` mode and 18 in `std`, so credits are not an option for me.
4. Do not retry on a timeout; check the job status first. Video requests are slow, so submit with `generate_video_batch` and wait with `jobs_wait`.

## Every clip

- Aspect ratio **9:16**, **no audio** (`generate_audio: false`), about 3 seconds. The model's shortest clip may be 4 seconds; use 4 and tell me.
- Medias: the earlier pose as `start_image`, the later pose as `end_image`. Use no other references.
- Prompt, exactly:

> The line-drawn woman in her pale full-body compression garment moves slowly and gracefully from the first pose to the second, like a gentle dance. The line style, face, hair, garment and proportions stay identical throughout. Static camera. Flat off-white #fbf7f9 background that never changes. No new elements appear.

## Order of work

**Step 1.** Generate **only F0 to F1**. Show it to me and wait for my approval.

**Step 2**, after I approve: generate the other six in one batch: F1 to F2, F2 to F3, F3 to F4, F4 to F5, F5 to F6, F6 to F7.

| Clip | Start, end | Final filename (for my records) |
|---|---|---|
| 1 | F0 to F1 | `figure-move-00-01.mp4` |
| 2 | F1 to F2 | `figure-move-01-02.mp4` |
| 3 | F2 to F3 | `figure-move-02-03.mp4` |
| 4 | F3 to F4 | `figure-move-03-04.mp4` |
| 5 | F4 to F5 | `figure-move-04-05.mp4` |
| 6 | F5 to F6 | `figure-move-05-06.mp4` |
| 7 | F6 to F7 | `figure-move-06-07.mp4` |

## Known risks, so you can watch for them

- Some pose pairs differ a lot: F2 to F3 (one arm rises), F4 to F5 (a knee lowers into a leg extension), F6 to F7 (arms open wide). These are the most likely to morph badly or add limbs.
- The model may darken or remove the garment's pale tint, add shading, or shift the line colour. Any of these is a reject.

## Checks, and rejection

After each batch, tell me plainly for every clip whether you could verify these, and which you could not:

- The first and last frames match the start and end poses.
- The face, hair, garment and line weight do not drift.
- The background colour does not shift (it must stay `#fbf7f9`).
- No new elements, shading or fill appear.
- No audio track.

Reject any clip where the face, hair or line weight drifts, or the background colour shifts, and tell me which. **Never regenerate anything without asking me first.**

## Finish

Show each batch once with a single `show_generation_by_ids` call, then list every clip's job ID against its clip number so I can have them downloaded. Do not put anyone's name, phone number or email in a prompt or `context` field. My trial ends 15 Nov 2026 at 18:44 UTC, so do this now.
