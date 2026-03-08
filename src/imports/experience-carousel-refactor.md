The visual direction is much better now, but there is still a layout problem.

The Experience section must behave like a fixed full-screen scene.
Right now the cards are affecting the section size, and the timeline keeps moving because the layout is not stable.

Please refactor the Experience carousel with these strict rules:

1. The Experience section must be exactly one viewport tall
- use `height: 100vh`
- do not let the section grow taller than the screen
- the section should feel like a fixed scene, not a normal content block

2. Add a dedicated carousel viewport
- create a wrapper for the carousel with `overflow: hidden`
- this viewport should define the visible area of the cards
- left and right cards must be partially visible but visually cropped by the viewport edges
- the cards should not expand the section width or height

3. Cards must live inside a fixed-size stage
- all cards should share the same base width and height
- the active card can scale visually, but it must not change the layout height
- do not let longer content push the section vertically
- if needed, constrain the card body and keep spacing consistent

4. Timeline must be layout-independent
- the timeline should stay fixed in the same position at the bottom of the section
- it must not move when cards change
- it should be aligned relative to the section viewport, not relative to card height
- card transitions must not affect timeline position

5. Card cropping behavior
- the side cards should feel like they continue outside the viewport
- only the center area is fully visible
- left and right cards must be cut by the viewport edges, not fully shown
- this should create a cinematic carousel effect

6. Section composition
Structure should be:

- fixed 100vh section
- top label: EXPERIENCE
- main carousel viewport in the center
- timeline anchored near the bottom
- everything vertically balanced inside the viewport

7. Motion
- the active card transitions smoothly
- side cards stay partially visible and blurred/faded
- no layout jump
- no vertical shift
- no timeline movement

8. Important
The Experience section should feel like a controlled stage.
The cards move inside it, but the section itself never resizes.

Please fix the layout architecture first, not just the visual styling.