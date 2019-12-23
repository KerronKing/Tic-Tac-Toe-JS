// Global Array to store player objects
const players = [];

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
    players.push(obj1, obj2);
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

  const currentPlayer = () => {
    var playerOne = players[0];
    var playerTwo = players[1];

    if (playerOne.moveNumber % 2 == 1) {
      var currentPlayer = playerOne;
    } else {
      var currentPlayer = playerTwo;
    }
    return currentPlayer;
  }

  const gameWon = () => {
    var player = currentPlayer();
    const winningPositions = [
      [playArea[0][0], playArea[0][1], playArea[0][2]],
      [playArea[1][0], playArea[1][1], playArea[1][2]],
      [playArea[2][0], playArea[2][1], playArea[2][2]],
      [playArea[0][0], playArea[1][0], playArea[2][0]],
      [playArea[0][1], playArea[1][1], playArea[2][1]],
      [playArea[0][2], playArea[1][2], playArea[2][2]],
      [playArea[0][0], playArea[1][1], playArea[2][2]],
      [playArea[0][2], playArea[1][1], playArea[2][0]]
    ]
    var final = winningPositions.map(elem => elem.filter(x => x != player.symbol));
    for (let i = 0; i < final.length; i++) {
      if (final[i].length == 0) {
        return true;
      }
    }
  return false;
  }

  const runGame = () => {
    getPlayerInfo();
    while (!gameWon()) {
      currentPlayer();
      const boardElements = document.getElementById('board').children;
      boardElements.forEach(elem => {
        if (elem.textContent == "") {
          elem.addEventListener('click', () => {
            elem.textContent = `${currentPlayer.symbol}`;
            gameboard.updateBoard(elem.id, currentPlayer.symbol);
            playerOne.moveNumber++;
            playerTwo.moveNumber++;
          })
        } else {
          elem.removeEventListener('click', () => {})
        }
      })
    }
  }
  return {runGame};
})();

// Player object
const Player = (name, symbol, moveNumber) => {
  return { name, symbol, moveNumber }
};

gameFlow.runGame();

// Next steps:

// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.
// runGame function - goes in gameFlow module and is the only (probable) global function call


// playerturn function updates gameboard.playArea in the position equal to the number in 
// div ID of the board. eg. #space-1.
