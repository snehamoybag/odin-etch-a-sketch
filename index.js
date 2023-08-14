const userInputEl = document.querySelector("#user-grid-input");

const updateInputValue = (el, val) => {
  // updates html attribute
  el.setAttribute("value", val);
  // updates text inside the input field
  el.value = val;
};

const updateGridSizePlaceholder = () => {
  const placeholderEl = document.querySelector("#grid-size-placeholder");
  placeholderEl.textContent = "x" + userInputEl.value;
};

const appendASquare = (gridEl, totalNumOfSquares) => {
  const gridWidth = gridEl.offsetWidth;
  const squareWidth = gridWidth / totalNumOfSquares;

  const squareEl = document.createElement("div");
  squareEl.classList.add("grid__square");
  squareEl.style.setProperty("--square-size", `${squareWidth}px`);

  gridEl.appendChild(squareEl);
};

const renderSquares = () => {
  const userInputNum = parseInt(userInputEl.value);

  if (userInputEl.value === "") {
    alert(
      "Input field cannot be empty! Please enter a valid number between 1-100"
    );
    return;
  }

  if (userInputNum <= 0) {
    alert("Grid can not be smaller than 1x1");
    updateInputValue(userInputEl, 1);
  }

  if (userInputNum > 100) {
    alert("Due to technical limitations, we only allow a grid upto 100x100");
    updateInputValue(userInputEl, 100);
  }

  const gridEl = document.querySelector("#grid");
  gridEl.innerHTML = ""; // clear previous squares
  const totalSquares = Math.pow(userInputNum, 2); // square of user input
  for (let i = 1; i <= totalSquares; i++) {
    appendASquare(gridEl, userInputNum);
  }
};

// render squares on pageload. Amount depends on Html input value
renderSquares();

// user input event listeners
userInputEl.addEventListener("change", renderSquares);
userInputEl.addEventListener("change", updateGridSizePlaceholder);
userInputEl.addEventListener("input", updateGridSizePlaceholder);
