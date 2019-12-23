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
    addPlayer(data[0], data[1]);
    console.log('test');
    });
  };

  // const gameWon = () => {

  // }

  // const playerTurn = () => {

  //   while (!gameWon()) {
  //     if (players.moveNumber % 2 == 1) {
  //       const boardElements = document.getElementById('board').children;
  //       boardElements.forEach(elem => {
  //         elem.addEventListener('click', () => {
  //           elem.textContent = `${players[i].symbol}`;
  //         })
  //       })
  //     }
  //   }
  return {getPlayerInfo};
})();

// Player object
const Player = (name, symbol) => {
  let moveNumber = 0;
  return { name, symbol, moveNumber }
};

gameFlow.getPlayerInfo();

// Next steps:

// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.
// runGame function - goes in gameFlow module and is the only (probable) global function call
