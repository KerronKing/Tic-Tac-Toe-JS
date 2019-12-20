// Global Array to store player objects
const players = [];

// Game-board module
const gameboard = (() => {
  let playArea = [];
  return { playArea };
})();

// Game-flow module
const gameFlow = (() => {

  const addPlayer = (name1, name2) => {

  const obj1 = Player(name1, 'X');
  const obj2 = Player(name2, '0');
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
    return {getPlayerInfo};
})();

// Player object
const Player = (name, symbol) => {
  return { name, symbol }
};

gameFlow.getPlayerInfo();
// Next steps:

// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.
