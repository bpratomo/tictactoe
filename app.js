/*
Tic Tac Toe 
requirement list: 

- The Board 
    -Need to render th marks on the board  
    -Need to detect valid moves 
    -Need to detect winners & losers
    -Need to store history of moves and is able to undo
    -Need to reset the board after game is over

- The Game 
    - Need to initiate a game 
    - Need to track scores between subsequent games after a game is completed
    - Need to switch turns after a turn is completed 

    

- The Player 
    - Need to have a symbol of player to draw in the board 
    - Need to have a name 
*/

class Game {
  constructor() {
    this.initiate();
    this.boardHistory = [];
    this.scoreBoard = {
      player1: 0,
      player2: 0,
    };
    this.roundWinner;
    this.player1 = new Player("X", "Player 1");
    this.player2 = new Player("O", "Player 2");
    this.player__active = this.player1;
    this.board = new Board(this.runTurn);
    this.boardContainer = document.querySelector(".container");
    this.boardContainer.addEventListener("click", (e) => {
      let index = e.target.classList.contains("box__value")
        ? e.target.parentNode.id
        : e.target.id;

      this.runTurn(index);
      e.stopPropagation();
    });
  }
  initiate() {
    // this.board.initiate();
  }

  concludeGame() {
    alert("game concluded!");
  }

  runTurn(boxIndex) {
    let newBoard = this.board.updateValue(boxIndex, this.player__active.symbol);
    if (newBoard) {
      this.boardHistory.push(newBoard);
    }

    this.player__active =
      this.player__active == this.player1 ? this.player2 : this.player1;

    this.roundWinner = this.board.detectWinner();
    if (this.roundWinner) {
      this.concludeGame();
    }
  }

  undo() {}

  redo() {}
}

class Board {
  constructor(callBackFn = NaN) {
    this.boardContainer = document.querySelector(".container");
    this.boardArray = [];
    this.reset();
    this.activeSymbol;
    this.initiate();
  }

  detectWinner() {
    //Horizontals
    let winners = [];
    let winningCombo = [
      // Horizontals
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // //   Verticals
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    let checkMatch = (accummulated, currentValue) => {
      if (currentValue == false) {
        return false;
      }
      if (this.boardArray[accummulated] == this.boardArray[currentValue]) {
        return currentValue;
      } else {
        return false;
      }
    };

    winningCombo.forEach((combo) => {
      let isWon = combo.reduce(checkMatch);
      let testedPlayer = this.boardArray[combo[0]];
      if (isWon == false || testedPlayer == "") {
        //   No winner yet
      } else {
        let winner = testedPlayer;
        winners.push(winner);
      }
    });

    if (winners.length > 0) {
      return winners[0];
    } else {
      return NaN;
    }
  }

  reset() {
    this.boardArray = ["", "", "", "", "", "", "", "", ""];

    if (this.boardContainer.firstChild) {
      this.boardContainer.removeChild(this.boardContainer.lastChild);
    }
  }

  initiate() {
    this.boardArray.forEach((symbol, index) => {
      let htmlBox = document.createElement("div");
      htmlBox.innerHTML = `
            <div class="box" id="${index}">
            <div class="box__value">
            ${symbol}
            </div>
            </div>`;

      this.boardContainer.appendChild(htmlBox);
    });
  }

  updateValue(boxIndex, symbol) {
    let htmlBox = document.getElementById(boxIndex);
    let htmlBoxValue = htmlBox.firstElementChild;

    let isAlreadyUpdated = htmlBox.classList.contains("updated");
    if (isAlreadyUpdated) {
      alert("already updated!");
      return NaN;
    } else {
      this.boardArray[boxIndex] = symbol;
      htmlBoxValue.innerText = symbol;
      htmlBox.classList.add("updated");

      return this.boardArray;
    }
  }
}

class Player {
  constructor(symbol, playerName = "playerX") {
    this.symbol = symbol;
    this.playerName = playerName;
  }
}

let game = new Game();
