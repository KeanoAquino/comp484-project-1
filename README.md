pages: https://keanoaquino.github.io/comp484-project-1/

## HTML Elements and Attributes Implementation

### Elements Implemented:

1. **button element**
   - Location: `index.html` (line with `popovertarget="create-list-popup"`)
   - Description: Creates the "Make Your List" floating button that triggers the popover form

2. **option element**
   - Location: Dynamically created in `js/list-creator.js` (inside the `forEach(movie => {...})` loop)
   - Description: Defines each selectable movie choice within the dropdown menus (24 Ghibli movies)

3. **object element**
   - Location: All movie pages (`movie1.html` - `movie5.html`)
   - Description: Embeds YouTube video trailers for each movie 

### Attributes Implemented:

1. **popover attribute**
   - Location: `index.html` (on the `<div id="create-list-popup">` element)
   - Description: Creates a dismissible overlay that appears on top of page content when triggered

2. **pattern attribute**
   - Location: `index.html` (on the name input field: `pattern="[A-Za-z\s'\-]{2,50}"`)
   - Description: Validates user's name input to only accept letters, spaces, hyphens, and apostrophes (2-50 characters)

3. **disabled attribute**
   - Location: Dynamically applied in `js/list-creator.js` (in the `updateDisabledOptions()` function)
   - Description: Prevents users from selecting the same movie multiple times across different dropdown menus