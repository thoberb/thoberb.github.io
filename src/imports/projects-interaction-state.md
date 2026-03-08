The Projects interaction is still incorrect.

You are still coupling:
- page section navigation
- and card flip progress

These must be separated.

I need the Projects section to behave like a real interactive scene with an internal state machine.

This is NOT a simple scroll animation.
This is a scroll-locked interaction with forward and reverse behavior.

--------------------------------------------------
CORE UX I WANT
--------------------------------------------------

When I scroll DOWN from Experience into Projects:

STEP 1
- The page first snaps/sticks to the Projects section
- The card is immediately visible
- The card has NOT started flipping yet
- flipProgress must still be 0
- arriving on Projects and flipping the card are 2 separate scroll actions

STEP 2
- Once Projects is fully active and locked in place,
- the NEXT downward scroll should start driving the card flip
- while flipping, the page must stay fixed on Projects
- scrolling must NOT move the next section at all
- scroll only updates `flipProgress` from 0 to 1
- the card flips vertically with rotateX

STEP 3
- When flipProgress reaches 1, the card is fully flipped
- BUT the user must still remain on the Projects section
- the next section must NOT appear automatically
- the user must scroll DOWN AGAIN after the completed flip
- only then should the section unlock and allow transition to Skills

--------------------------------------------------
REVERSE UX I WANT
--------------------------------------------------

When I scroll UP:

CASE A
- If I am on Projects and flipProgress is 1 (card fully flipped),
- upward scroll must first reverse the card flip
- it must NOT jump immediately back to the previous section

CASE B
- If flipProgress is between 0 and 1,
- upward scroll reduces flipProgress back toward 0
- page stays fixed on Projects while this happens

CASE C
- Only once flipProgress === 0
- and I scroll up AGAIN
- should the page be allowed to return to the previous section

So reverse behavior must mirror forward behavior.

--------------------------------------------------
IMPLEMENTATION REQUIREMENTS
--------------------------------------------------

Do NOT solve this with:
- increasing section height
- 150vh / 200vh
- opacity tricks
- early transition to next section
- global scroll progress tied directly to section movement

Keep Projects section height:
- `min-h-screen`

Use a proper state machine.

--------------------------------------------------
STATE MACHINE
--------------------------------------------------

Implement these states:

1. `idle`
- Projects is not active yet

2. `entered`
- Projects section is active / snapped / sticky
- card visible
- flipProgress = 0
- waiting for a new scroll input to start the flip

3. `flipping`
- Projects is locked
- scroll input is intercepted with preventDefault
- scroll delta updates internal flipProgress between 0 and 1
- page does not move

4. `flipped`
- flipProgress = 1
- Projects still active and locked
- waiting for a NEW downward scroll to release to next section
- waiting for upward scroll to reverse the flip

5. `reversing`
- upward scroll decreases flipProgress from 1 toward 0
- page still locked on Projects

6. `releasedForward`
- user has already completed the flip
- then scrolled down again
- normal page scrolling resumes to next section

7. `releasedBackward`
- user has returned flipProgress to 0
- then scrolled up again
- normal page scrolling resumes to previous section

--------------------------------------------------
SCROLL RULES
--------------------------------------------------

DOWNWARD SCROLL

If state = `entered`
→ do not move page
→ switch to `flipping`

If state = `flipping`
→ preventDefault()
→ increase flipProgress
→ if flipProgress reaches 1 → state = `flipped`

If state = `flipped`
→ do not auto-transition
→ wait for a NEW downward scroll
→ on this new downward scroll: state = `releasedForward`
→ allow next section scroll

UPWARD SCROLL

If state = `flipped`
→ do not move page
→ switch to `reversing`

If state = `reversing`
→ preventDefault()
→ decrease flipProgress
→ if flipProgress reaches 0 → state = `entered`

If state = `entered`
→ do not auto-go to previous section
→ wait for a NEW upward scroll
→ on this new upward scroll: state = `releasedBackward`
→ allow previous section scroll

--------------------------------------------------
IMPORTANT DETAIL
--------------------------------------------------

The scroll action that ARRIVES on Projects must NOT already consume the flip.

This is the main problem right now.

Arrival scroll should only:
- snap the Projects section into place
- show the card
- set state = `entered`

Only the NEXT downward scroll should flip the card.

Likewise:
the scroll that FINISHES the flip should NOT automatically move to the next section.

After the card is fully flipped,
I must still remain on Projects
until I scroll once more.

--------------------------------------------------
TECHNICAL DIRECTION
--------------------------------------------------

Please implement this with:

- local state:
  - `interactionState`
  - `flipProgress`
  - `hasEnteredProjects`
  - `waitingForNextScrollAfterFlip`
  - `waitingForNextScrollAfterReset`

- wheel event interception on Projects section
- `event.preventDefault()` only while Projects is in an interactive locked state
- rotateX derived from flipProgress
- clear separation between:
  - section activation
  - card interaction
  - release to section navigation

If needed, use:
- IntersectionObserver or inView detection
to know when Projects is the active section

But once Projects is active,
do NOT tie the flip directly to page scroll progress.
The flip must be driven by an internal local interaction progress.

--------------------------------------------------
SUCCESS CRITERIA
--------------------------------------------------

Correct behavior must be exactly:

DOWN
1. scroll into Projects
2. Projects sticks, card visible, no flip yet
3. scroll again → card flips
4. card fully flipped, still on Projects
5. scroll again → next section

UP
1. from flipped state, scroll up
2. card unflips
3. card fully reset, still on Projects
4. scroll up again → previous section

This exact interaction is mandatory.