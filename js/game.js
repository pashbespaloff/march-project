const field = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const winCombinations = [
  [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0}],
  [{x: 0, y: 1},{x: 1, y: 1},{x: 2, y: 1}],
  [{x: 0, y: 2},{x: 1, y: 2},{x: 2, y: 2}],

  [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
  [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
  [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],

  [{x: 0, y: 0},{x: 1, y: 1},{x: 2, y: 2}],
  [{x: 2, y: 0},{x: 1, y: 1},{x: 0, y: 2}]
];

let activePlayer = "x";

const gameBox = document.querySelector(".game-box"),
      game = gameBox.querySelector(".game-field"),
      gameButtons = game.querySelectorAll("button"),
      gameResult = gameBox.querySelector(".game-result"),
      restartGameBtn = gameBox.querySelector(".btn-restart-game");

game.addEventListener("click", gameHandler);
restartGameBtn.addEventListener("click", restartGame);

function togglePlayer() {
  (activePlayer === "x") ? activePlayer = "o" : activePlayer = "x";
};

function toggleFieldBlock(unblock) {
  (unblock)
    ? gameButtons.forEach(button => button.removeAttribute("disabled"))
    : gameButtons.forEach(button => button.setAttribute("disabled", true));
};

function gameHandler(event) {
  const isButton = event.target.classList.contains("game-btn");

  if (isButton) {
    const button = event.target,
          x = button.dataset.x,
          y = button.dataset.y;
    
    if (field[x][y] === null) {
      button.textContent = activePlayer;
      field[x][y] = activePlayer;
      togglePlayer();
      isWinner();
    };    
  };
};

function isWinner() {
  let winner;

  winCombinations.forEach(winCombination => {
    const match1 = winCombination[0],
          match2 = winCombination[1],
          match3 = winCombination[2],

          xMatched = field[match1.x][match1.y] === "x" 
                    && field[match2.x][match2.y] === "x" 
                    && field[match3.x][match3.y] === "x",

          oMatched = field[match1.x][match1.y] === "o" 
                    && field[match2.x][match2.y] === "o" 
                    && field[match3.x][match3.y] === "o",

          noMatches = !xMatched && !oMatched && (field.flat()).includes(null) === false;

    if (xMatched) winner = "x";
    else if (oMatched) winner = "o";
    else if (noMatches) winner = "nobody";

    if (winner) showWinner(winner);
  });

  return winner;
};

function showWinner(winner) {
  if (winner === "x") {
    gameResult.classList.add("red");
    gameButtons.forEach(button => button.classList.add("red"));

  } else if (winner === "o") {
    gameResult.classList.add("blue");
    gameButtons.forEach(button => button.classList.add("blue"));
  };

  gameResult.innerHTML = `the winner: <b>${winner}</b>`;
  toggleFieldBlock();
};

function restartGame() {
  field.forEach(row => row.fill(null));
  gameButtons.forEach(button => button.textContent = null);
  gameResult.innerHTML = "&nbsp;";

  gameResult.classList.remove("red");
  gameResult.classList.remove("blue");
  gameButtons.forEach(button => button.classList.remove("red"));
  gameButtons.forEach(button => button.classList.remove("blue"));

  activePlayer = "x";

  toggleFieldBlock(true);
};