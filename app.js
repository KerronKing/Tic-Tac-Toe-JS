// Game-board module
const gameboard = (() => {
  let playArea = [];
  return { playArea };
})();

// Game-flow module
const gameflow = (() => {

})();

// Player object
const Player = (name, symbol) => {
  return { name, symbol }
};

// Global Array to store player objects
const players = [];

// Next steps:

// Make the board with divs (3 rows x 3 columns).
// Each div would have a unique id (as follows: position-${1 - 9} )
// Each div would have an event listener (click event) that saves an
  // entry on the gameBoard array.
// Render textContent (appropriate player symbol) in the div that was clicked.
// Add function to remove event listener if a game board div has text content already.





