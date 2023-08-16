const userInputEl = document.querySelector("#user-grid-input");

// constructor to create and update different modes
function ModeConstructor(defaultModeName) {
  let _mode = defaultModeName;
  this.set = function(modeName) {
    _mode = modeName;
  };
  this.get = function() {
    return _mode;
  };
}

const colorMode = new ModeConstructor("single-color");
const toolMode = new ModeConstructor("pen");

// updates the placeholderText beside the user input field
const updateGridSizePlaceholder = () => {
  const placeholderEl = document.querySelector("#grid-size-placeholder");
  placeholderEl.textContent = "x" + userInputEl.value;
};

const renderSquares = (squaresPerRow, totalNumOfSquares) => {
  const gridEl = document.querySelector("#grid");
  const gridWidth = gridEl.offsetWidth;
  const squareWidth = gridWidth / squaresPerRow;

  const squareEl = document.createElement("div");
  squareEl.classList.add("grid__square");
  squareEl.style.setProperty("--square-size", `${squareWidth}px`);

  // remove prevous squares
  gridEl.innerHTML = "";
  for (let i = 1; i <= totalNumOfSquares; i++) {
    const clonedSquareEl = squareEl.cloneNode(false);
    gridEl.appendChild(clonedSquareEl);
  }
};

const updateGridLayout = () => {
  const userInputNum = parseInt(userInputEl.value);

  if (userInputEl.value === "") {
    alert(
      "Input field cannot be empty! Please enter a valid number between 1-100"
    );
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

  const totalSquares = Math.pow(userInputNum, 2); // square of user input
  renderSquares(userInputNum, totalSquares);
};

const changeSquareColor = (squareEl) => {
  const selectedColor = document.querySelector("#color-picker").value;
  squareEl.style.setProperty("--square-clr", selectedColor);
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
  changeSquareColor(touchedEl);
};

const sketchWithMouse = (event) => {
  const target = event.target;
  const isTargetASquare = target && target.classList.contains("grid__square");

  if (!isTargetASquare) return;
  changeSquareColor(target);
};

// render squares on pageload. Amount depends on Html input value
updateGridLayout();

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

// update grid
const gridEl = document.querySelector("#grid");
gridEl.addEventListener("touchmove", sketchWithTouch);
gridEl.addEventListener("mouseover", sketchWithMouse);
