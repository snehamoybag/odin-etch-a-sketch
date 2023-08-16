const userInputEl = document.querySelector("#user-grid-input");

// constructor to create and update different modes
function ModeConstructor(defaultModeName) {
  let _mode = defaultModeName;
  this.set = function (modeName) {
    _mode = modeName;
  };
  this.get = function () {
    return _mode;
  };
}

const colorMode = new ModeConstructor("single-color");
const toolMode = new ModeConstructor("pen");

// grid square behaviour constructor
function SquareBehaviour() {
  const createASquare = function (squareWidth) {
    const squareEl = document.createElement("div");
    squareEl.classList.add("grid__square");
    squareEl.style.setProperty("--square-size", `${squareWidth}px`);
    return squareEl;
  };

  this.render = function (parentEl, width, numOfSquares) {
    const squareEl = createASquare(width);
    for (let i = 1; i <= numOfSquares; i++) {
      const clonedSquareEl = squareEl.cloneNode(false); // shallow copy
      parentEl.appendChild(clonedSquareEl);
    }
  };

  this.removeAll = function (parentEl) {
    const allSquareEls = parentEl.querySelectorAll(".grid__square");
    allSquareEls.forEach((square) => parentEl.removeChild(square));
  };

  this.changeColor = function (squareEl, color) {
    squareEl.style.setProperty("--square-clr", color);
  };

  this.removeAllColors = function (parentEl) {
    const allSquareEls = parentEl.querySelectorAll(".grid__square");
    allSquareEls.forEach((squareEl) => {
      this.changeColor(squareEl, "transparent");
    });
  };
}

const square = new SquareBehaviour();

// updates the placeholderText beside the user input field
const updateGridSizePlaceholder = () => {
  const placeholderEl = document.querySelector("#grid-size-placeholder");
  placeholderEl.textContent = "x" + userInputEl.value;
};

const updateGridLayout = () => {
  const userInputNum = parseInt(userInputEl.value);

  if (userInputEl.value === "" || isNaN(userInputNum)) {
    alert("Please enter a valid number between 1-100");
    return;
  }

  if (userInputNum <= 0) {
    alert("Grid can not be smaller than 1x1");
    return;
  }

  if (userInputNum > 100) {
    alert("Due to technical limitations, we only allow a grid upto 100x100");
    return;
  }

  const gridEl = document.querySelector("#grid");
  const squareWidth = gridEl.offsetWidth / userInputNum;
  const totalSquares = Math.pow(userInputNum, 2); // square of user input

  square.removeAll(gridEl); // remove previous squares
  square.render(gridEl, squareWidth, totalSquares);
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
  const selectedColor = document.querySelector("#color-picker").value;
  square.changeColor(touchedEl, selectedColor);
};

const sketchWithMouse = (event) => {
  const target = event.target;
  const isTargetASquare = target && target.classList.contains("grid__square");

  if (!isTargetASquare) return;
  const selectedColor = document.querySelector("#color-picker").value;
  square.changeColor(target, selectedColor);
};

// render squares on pageload. Amount depends on Html input value
updateGridLayout();

// update grid
const gridEl = document.querySelector("#grid");
gridEl.addEventListener("touchmove", sketchWithTouch);
gridEl.addEventListener("mouseover", sketchWithMouse);

// user input event listeners
userInputEl.addEventListener("change", () => {
  updateGridLayout();
  updateGridSizePlaceholder();
});
userInputEl.addEventListener("input", updateGridSizePlaceholder);

// update color modes
const colorPickerEl = document.querySelector("#color-picker");
const colorRandomizerEl = document.querySelector("#color-randomizer");

colorPickerEl.addEventListener("click", () => colorMode.set("single-color"));
colorRandomizerEl.addEventListener("click", () =>
  colorMode.set("random-color")
);

// clear all squares colors
const clearAllEl = document.querySelector("#clear-all");
clearAllEl.addEventListener("click", () => square.removeAllColors(gridEl));
