# TODO LIST

## Featuers to be added

- user can change grid sizes upto 100x100
- user can select color
- user can use rainbow colors (random colors)
- user can erase
- user can clear all by a single click
- the app should work on touch screen devices too

## How to Implement

- give the app a old school desktop app look
- Have ainput element so user can change number of squares in the grid
- if user types 64 (or any value) we need to render 64x64 squares on to the grid
- by default the input value should be set to 16x16
- get the value from the input and display the squares on the grid
- use onchange event to update the grid when ever user changes the input value
- notify the user using a alert or modal if user types more than the supported number of grid squares (more than 100x100)
- user can able to choose colors from a html color picker
- so we need to get the value from the color picker and update the squares background with the selected color
- by selecting earaser the user will basically change squares background to transparent
- the clear all button will basically remove background color from the squares
- ranbow pen will basically randomize the background color of the div
- so we need to have a function that can output random color values
- make sure the app works on touch screen devices too
- make function that will detect the user's device type
- use mouseover event for pointer devices and touchmove event for tocuh screens

### Extra

- try adding a undo and redo functionality
