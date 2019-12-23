// Global Array to store player objects
let players = [{name: "default", symbol:"?", moveNumber: 0}];

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
  const obj2 = Player(name2, '0', 0);
    players.unshift(obj1, obj2);
  };

  const getPlayerInfo = () => {

    const playerInfo = document.forms['player-input'];
    playerInfo.addEventListener('submit', function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(playerInfo).entries());
    addPlayer(data['name-1'], data['name-2']);
    console.log(data);
    playerInfo.reset();
    });
  };

  let currentPlayer = (array) => {
    var playerOne = array[0];
    var playerTwo = array[1];

    if (playerOne.moveNumber % 2 == 1) {
      var current = playerOne;
    } else {
      var current = playerTwo;
    }
    return current;
  }

  const gameWon = () => {
    currentPlayer(players);
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
    let final = winningPositions.map(elem => elem.filter(x => x != currentPlayer(players).symbol));
    for (let i = 0; i < final.length; i++) {
      if (final[i].length == 0) {
        return true;
      }
    }
  return false;
  }

  const getEvents = () => {
    currentPlayer(players);
    const boardElements = document.getElementById('board').children;
    const boardArray = Array.from(boardElements);
    boardArray.forEach(elem => {
      if (elem.textContent == "") {
        elem.addEventListener('click', () => {
          console.log(currentPlayer(players));
          elem.innerHTML = `<p>${currentPlayer(players).symbol}</p>`;
          gameboard.updateBoard(elem.id, currentPlayer(players).symbol);
          players[0].moveNumber++;
          players[1].moveNumber++;
        })
      } else {
        elem.removeEventListener('click', () => {})
      }
    });
  }

//   const runGame = () => {
//     getPlayerInfo();
//     while (!gameWon()) {
//   }
  return {getEvents, getPlayerInfo};
})();

// Player object
const Player = (name, symbol, moveNumber) => {
  return { name, symbol, moveNumber }
};

gameFlow.getPlayerInfo();
gameFlow.getEvents();
// gameFlow.runGame();

// Next steps:

// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.
// runGame function - goes in gameFlow module and is the only (probable) global function call


// playerturn function updates gameboard.playArea in the position equal to the number in
// div ID of the board. eg. #space-1.
