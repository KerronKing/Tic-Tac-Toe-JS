// Global Array to store player objects
let players = [{name: "default", symbol:"?", moveNumber: 0}];

// Start/Re-start button

const starter = document.getElementById('starter');
starter.textContent = 'Start Game';

if (!starter.clicked) {
  starter.addEventListener('click', () => {
    const input = document.getElementById('input');
    const board = document.getElementById('board');
    input.classList.remove('hidden');
    board.classList.remove('hidden');
    starter.textContent = 'Restart Game';
  })
} else {
  starter.addEventListener('click', () => {

  })
}




// Game-board module
const gameboard = (() => {
  let playArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const updateBoard = (id, symbol) => {
    switch (id) {
      case "space-1":
        playArea[0][0] = symbol;
        break;
      case "space-2":
        playArea[0][1] = symbol;
        break;
      case "space-3":
        playArea[0][2] = symbol;
        break;
      case "space-4":
        playArea[1][0] = symbol;
        break;
      case "space-5":
        playArea[1][1] = symbol;
        break;
      case "space-6":
        playArea[1][2] = symbol;
        break;
      case "space-7":
        playArea[2][0] = symbol;
        break;
      case "space-8":
        playArea[2][1] = symbol;
        break;
      case "space-9":
        playArea[2][2] = symbol;
        break;
    }
  }
  return { playArea, updateBoard };
})();

// Game-flow module
const gameFlow = (() => {

  const addPlayer = (name1, name2) => {

  const obj1 = Player(name1, 'X', 1);
  const obj2 = Player(name2, 'O', 0);
    players.unshift(obj1, obj2);
  };

  const gameWon = () => {
    const winningPositions = [
      [gameboard.playArea[0][0], gameboard.playArea[0][1], gameboard.playArea[0][2]],
      [gameboard.playArea[1][0], gameboard.playArea[1][1], gameboard.playArea[1][2]],
      [gameboard.playArea[2][0], gameboard.playArea[2][1], gameboard.playArea[2][2]],
      [gameboard.playArea[0][0], gameboard.playArea[1][0], gameboard.playArea[2][0]],
      [gameboard.playArea[0][1], gameboard.playArea[1][1], gameboard.playArea[2][1]],
      [gameboard.playArea[0][2], gameboard.playArea[1][2], gameboard.playArea[2][2]],
      [gameboard.playArea[0][0], gameboard.playArea[1][1], gameboard.playArea[2][2]],
      [gameboard.playArea[0][2], gameboard.playArea[1][1], gameboard.playArea[2][0]]
    ]
    let finalX = winningPositions.map(elem => elem.filter(x => x == "X"));
    let finalO = winningPositions.map(elem => elem.filter(x => x == "O"));

    for (let i = 0; i < finalX.length; i++) {
      if (finalX[i].length == 3) {
        return true;
      } else if (finalO[i].length == 3) {
        return true;
      }
    }  
  return false;
  }

  const gameDrawn = () => {
    let counter = 0;
    const boardElements = document.getElementById('board').children;
    const boardArray = Array.from(boardElements);
    boardArray.forEach(elem => {
      if (elem.innerHTML != "") {
        counter++;
      }
    })
    if ((counter == 9) && !gameWon()) {
      return true;
    }
    return false;
  }

  const getEvents = () => {
    const boardElements = document.getElementById('board').children;
    const boardArray = Array.from(boardElements);
    boardArray.forEach(elem => {
      const clickEvent = function () {
        currentPlayer(players);
        elem.innerHTML = `${currentPlayer(players).symbol}`;
        gameboard.updateBoard(elem.id, currentPlayer(players).symbol);
        elem.removeEventListener('click', clickEvent, false);
        players[0].moveNumber++;
        players[1].moveNumber++;
        console.log(gameDrawn());
        if (gameWon()) {
          let alerts = document.getElementById('alerts');
          alerts.innerHTML = `${currentPlayer(players).name} is the winner`;
        } else if (gameDrawn()) {
          let alerts = document.getElementById('alerts');
          alerts.innerHTML = "It's a drawn game!";
        } else {
          alerts.innerHTML = `${currentPlayer(players).name}'s turn`;
        }
      }
      if (elem.innerHTML == "") {
        elem.addEventListener('click', clickEvent, false);
      }
    });
  }
  const getPlayerInfo = () => {

    const playerInfo = document.forms['player-input'];
    playerInfo.addEventListener('submit', function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(playerInfo).entries());
    addPlayer(data['name-1'], data['name-2']);
    getEvents();
    playerInfo.reset();
    });
  };

  const currentPlayer = (array) => {
    var playerOne = array[0];

    if (playerOne.moveNumber % 2 == 1) {
      return Object.assign({}, array[0]);
    } else {
      return Object.assign({}, array[1]);
    };
  }

  return {getPlayerInfo};
})();

// Player object
const Player = (name, symbol, moveNumber) => {
  return { name, symbol, moveNumber }
};

gameFlow.getPlayerInfo();


// Next steps:

// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.
// runGame function - goes in gameFlow module and is the only (probable) global function call


// playerturn function updates gameboard.playArea in the position equal to the number in
// div ID of the board. eg. #space-1.
