"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusMessage = document.getElementById("statusMessage");
  const resetButton = document.getElementById("resetButton");

  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  // Winning conditions
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function to handle a cell click
  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    // If the cell is already filled or game is inactive, do nothing
    if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    // Update game state
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer; // Display X or O
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for styling

    checkResult();
  }

  // Function to check for win or draw
  function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard[winCondition[0]];
      let b = gameBoard[winCondition[1]];
      let c = gameBoard[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        // Highlight winning cells
        winCondition.forEach((index) => {
          cells[index].classList.add("winning");
        });
        break;
      }
    }

    if (roundWon) {
      statusMessage.innerHTML = `Player ${currentPlayer} Wins!`;
      statusMessage.style.color = "var(--winning-color)";
      gameActive = false;
      return;
    }

    let roundDraw = !gameBoard.includes("");
    if (roundDraw) {
      statusMessage.innerHTML = "It's a Draw!";
      statusMessage.style.color = "var(--secondary-color)";
      gameActive = false;
      return;
    }

    // If no win or draw, switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.innerHTML = `Player ${currentPlayer}'s Turn`;
    statusMessage.style.color = "var(--secondary-color)";
  }

  // Function to reset the game
  function handleResetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusMessage.innerHTML = `Player ${currentPlayer}'s Turn`;
    statusMessage.style.color = "var(--secondary-color)";

    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("x", "o", "winning");
    });
  }

  // Event listeners
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", handleResetGame);
});
