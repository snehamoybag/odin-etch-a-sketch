// constructor to create and update different modes
function ModeConstructor(defaultModeName) {
  let _mode = defaultModeName;
  this.set = function(modeName) {
    _mode = modeName;
  };
  this.get = function() {
    return _mode;
  };
  this.activateEl = function(activateEl, deactivateEl) {
    deactivateEl.classList.remove("active");
    activateEl.classList.add("active");
  };
}

const colorMode = new ModeConstructor("single-color");
const toolMode = new ModeConstructor("pen");

// grid square behaviour constructor
function SquareBehaviour() {
  const createASquare = function(squareWidth) {
    const squareEl = document.createElement("div");
    squareEl.classList.add("grid__square");
    squareEl.style.setProperty("--square-size", `${squareWidth}px`);
    return squareEl;
  };

  this.render = function(parentEl, width, numOfSquares) {
    const squareEl = createASquare(width);
    for (let i = 1; i <= numOfSquares; i++) {
      const clonedSquareEl = squareEl.cloneNode(false); // shallow copy
      parentEl.appendChild(clonedSquareEl);
    }
  };

  this.removeAll = function(parentEl) {
    const allSquareEls = parentEl.querySelectorAll(".grid__square");
    allSquareEls.forEach((square) => parentEl.removeChild(square));
  };

  this.changeColor = function(squareEl, color) {
    squareEl.style.setProperty("--square-clr", color);
  };

  this.removeAllColors = function(parentEl) {
    const allSquareEls = parentEl.querySelectorAll(".grid__square");
    allSquareEls.forEach((squareEl) => {
      this.changeColor(squareEl, "transparent");
    });
  };
}

const square = new SquareBehaviour();

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

const modifySquares = (el) => {
  if (toolMode.get() === "pen" && colorMode.get() === "single-color") {
    const selectedColor = document.querySelector("#color-picker").value;
    square.changeColor(el, selectedColor);
  }

  if (toolMode.get() === "pen" && colorMode.get() === "random-color") {
    square.changeColor(el, getRandomColor());
  }

  if (toolMode.get() === "eraser") {
    square.changeColor(el, "transparent");
  }
};

// simulate mouseover event on touch devices
// only works on "touchmove" event
// source: https://gist.github.com/VehpuS/6fd5dca2ea8cd0eb0471
const sketchWithTouch = (event) => {
  const touch = event.touches[0];
  const touchedEl = document.elementFromPoint(touch.clientX, touch.clientY);
  const isTouchedElASquare =
    touchedEl && touchedEl.classList.contains("grid__square");

  if (!isTouchedElASquare) return;
  modifySquares(touchedEl);
};

const sketchWithMouse = (event) => {
  const target = event.target;
  const isTargetASquare = target && target.classList.contains("grid__square");

  if (!isTargetASquare) return;
  modifySquares(target);
};

// updates the placeholderText beside the user input field
const updateInputPlaceholderText = (inputEl) => {
  const placeholderEl = document.querySelector("#grid-size-placeholder");
  placeholderEl.textContent = "x" + inputEl.value;
};

const updateGridLayout = (inputEl, gridEl) => {
  console.log(inputEl);
  const userInputNum = parseInt(inputEl.value);

  if (inputEl.value === "" || isNaN(userInputNum)) {
    alert("Please enter a valid number between 1-100");
    return;
  }

  if (userInputNum <= 0) {
    alert("Grid can not be smaller than 1x1");
    return;
  }

  if (userInputNum > 64) {
    alert("Due to technical limitations, we only allow a grid upto 64x64");
    return;
  }

  const squareWidth = gridEl.offsetWidth / userInputNum;
  const totalSquares = Math.pow(userInputNum, 2); // square of user input

  square.removeAll(gridEl); // remove previous squares
  square.render(gridEl, squareWidth, totalSquares);
};

// update grid
const gridEl = document.querySelector("#grid");
gridEl.addEventListener("touchmove", sketchWithTouch);
gridEl.addEventListener("mouseover", sketchWithMouse);

// user input event listeners
const userInputEl = document.querySelector("#user-grid-input");
userInputEl.addEventListener("change", () => {
  updateGridLayout(userInputEl, gridEl);
  updateInputPlaceholderText(userInputEl);
});
userInputEl.addEventListener("input", () =>
  updateInputPlaceholderText(userInputEl)
);

// update color modes
const colorPickerEl = document.querySelector("#color-picker");
const colorRandomizerEl = document.querySelector("#color-randomizer");

colorPickerEl.addEventListener("click", () => {
  colorMode.set("single-color");
  colorMode.activateEl(colorPickerEl, colorRandomizerEl);
});
colorRandomizerEl.addEventListener("click", () => {
  colorMode.set("random-color");
  colorMode.activateEl(colorRandomizerEl, colorPickerEl);
});

// update tools
const penToolEl = document.querySelector("#pen-tool");
const eraserToolEl = document.querySelector("#eraser-tool");

penToolEl.addEventListener("click", () => {
  toolMode.set("pen");
  toolMode.activateEl(penToolEl, eraserToolEl);
});
eraserToolEl.addEventListener("click", () => {
  toolMode.set("eraser");
  toolMode.activateEl(eraserToolEl, penToolEl);
});

// clear all squares colors
const clearAllEl = document.querySelector("#clear-all");
clearAllEl.addEventListener("click", () => square.removeAllColors(gridEl));

// render squares on pageload. Amount depends on Html input value
updateGridLayout(userInputEl, gridEl);
