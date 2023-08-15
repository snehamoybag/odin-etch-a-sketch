const userInputEl = document.querySelector("#user-grid-input");

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

// render squares on pageload. Amount depends on Html input value
updateGridLayout();

// user input event listeners
userInputEl.addEventListener("change", () => {
  updateGridLayout();
  updateGridSizePlaceholder();
});
userInputEl.addEventListener("input", updateGridSizePlaceholder);
