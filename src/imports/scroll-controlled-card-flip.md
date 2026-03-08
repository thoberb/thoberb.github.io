You are currently trying to solve this problem with section height and scroll timing, but that is incorrect.

This is NOT a layout problem.
This is an **input interception + internal scroll progress problem**.

The page must temporarily **capture the user's scroll input** and use it to drive the card flip animation before allowing the page to scroll to the next section.

Do NOT:

* increase the section height
* use 150vh or 200vh hacks
* rely on scroll-snap timing tricks
* fade the section out early
* move the next section while the card is flipping

Keep the section height: `min-h-screen`.

---

Desired behavior:

1. When the user arrives on the **Projects section**, the card must already be visible.
2. The page should stay fixed on this section.
3. When the user scrolls, the page must NOT move yet.
4. The scroll input must instead control an internal variable called `flipProgress` (0 → 1).
5. This progress controls the card rotation using `rotateX`.
6. The card flips **vertically** (top → bottom).
7. While `flipProgress < 1`, the page scroll must be blocked.
8. Only after the flip finishes (`flipProgress === 1`) should the normal page scroll resume.
9. Once unlocked, scrolling again should move the user to the next section.

The user experience should feel like:

Arrive on Projects
↓
Card already visible
↓
Scroll → card flips vertically
↓
Page does NOT move
↓
Flip finishes
↓
Next scroll → page moves to the next section

---

Implementation strategy:

Add a **scroll lock system** to the Projects section.

Create state:

`flipProgress` (0 → 1)
`isScrollLocked` (boolean)

When the Projects section enters the viewport:

* set `isScrollLocked = true`
* card starts at `flipProgress = 0`

Intercept scroll input:

Use a `wheel` event listener.

When `isScrollLocked === true`:

* call `event.preventDefault()`
* convert `event.deltaY` into a change in `flipProgress`
* clamp the value between 0 and 1

Example:

`flipProgress = clamp(flipProgress + deltaY * sensitivity, 0, 1)`

Bind `flipProgress` to the card rotation:

`rotateX = flipProgress * 180deg`

---

Unlocking scroll:

When `flipProgress >= 1`:

* set `isScrollLocked = false`
* remove the scroll interception
* allow normal page scroll again

At that point the next section can appear normally.

---

Important constraints:

* Do NOT change the section height
* Do NOT allow the page to move while flipping
* Do NOT start the next section before the flip finishes
* The flip must feel like a **scroll-controlled interaction**, not a timed animation

---

Optional improvement:

Support reverse scroll.

If the user scrolls upward while still in the section and the card is flipped:

* decrease `flipProgress`
* rotate the card back
* keep the page locked until `flipProgress` returns to 0

This makes the interaction reversible and much more natural.

---

Final goal:

The Projects section behaves like an **interactive scroll-controlled scene**, not a normal scroll section.

Scrolling controls the animation first.

Only after the interaction finishes does the page continue.
