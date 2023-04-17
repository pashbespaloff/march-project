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
      reloadGameBtn = gameBox.querySelector(".btn-reload-game");

game.addEventListener("click", gameHandler);
reloadGameBtn.addEventListener("click", reloadGame);

function togglePlayer() {
  (activePlayer == "x") ? activePlayer = "o" : activePlayer = "x";
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

          isMatchXs = field[match1.x][match1.y] === "x" 
                    && field[match2.x][match2.y] === "x" 
                    && field[match3.x][match3.y] === "x",

          isMatchOs = field[match1.x][match1.y] === "o" 
                    && field[match2.x][match2.y] === "o" 
                    && field[match3.x][match3.y] === "o",

          areNoMatches = !isMatchXs && !isMatchOs && (field.flat()).includes(null) == false;

    if (isMatchXs) {
      winner = "x";
      showWinner(winner);

    } else if (isMatchOs) {
      winner = "o";
      showWinner(winner);

    } else if (areNoMatches) {
      winner = "nobody";
      showWinner(winner);
    };
  });

  return winner;
};

function showWinner(winner) {
  gameResult.innerHTML = `the winner: <b>${winner}</b>`;
  toggleFieldBlock();
};

function reloadGame() {
  field.forEach(row => row.fill(null));
  gameButtons.forEach(button => button.textContent = null);
  gameResult.innerHTML = "&nbsp;";

  activePlayer = "x";
  
  toggleFieldBlock(true);
};