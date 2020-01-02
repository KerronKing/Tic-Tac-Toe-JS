// Global Array to store player objects
let players = [];

// Player object
const Player = (name, symbol, moveNumber) => ({ name, symbol, moveNumber });

// Game-board module
const gameboard = (() => {
  const playArea = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const render = () => {
    const container = document.getElementById('container');
    const div = document.createElement('DIV');
    div.id = 'board';
    container.appendChild(div);

    const counter = 9;
    for (let i = 1; i <= counter; i += 1) {
      const innerDiv = document.createElement('DIV');
      innerDiv.classList.add('space');
      innerDiv.id = `space-${i}`;
      div.appendChild(innerDiv);
    }
  };

  const updateBoard = (id, symbol) => {
    switch (id) {
      case 'space-1':
        playArea[0][0] = symbol;
        break;
      case 'space-2':
        playArea[0][1] = symbol;
        break;
      case 'space-3':
        playArea[0][2] = symbol;
        break;
      case 'space-4':
        playArea[1][0] = symbol;
        break;
      case 'space-5':
        playArea[1][1] = symbol;
        break;
      case 'space-6':
        playArea[1][2] = symbol;
        break;
      case 'space-7':
        playArea[2][0] = symbol;
        break;
      case 'space-8':
        playArea[2][1] = symbol;
        break;
      case 'space-9':
        playArea[2][2] = symbol;
        break;
      default:
    }
  };
  return { playArea, updateBoard, render };
})();

// Game-flow module
const gameFlow = (() => {
  const addPlayer = (name1, name2) => {
    const obj1 = Player(name1, 'X', 1);
    const obj2 = Player(name2, 'O', 0);
    players.unshift(obj1, obj2);

    if (players.length >= 2) {
      players.length = 2;
    }
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
      [gameboard.playArea[0][2], gameboard.playArea[1][1], gameboard.playArea[2][0]],
    ];
    const finalX = winningPositions.map(elem => elem.filter(x => x === 'X'));
    const finalO = winningPositions.map(elem => elem.filter(x => x === 'O'));

    for (let i = 0; i < finalX.length; i += 1) {
      if (finalX[i].length === 3) {
        return true;
      } else if (finalO[i].length === 3) {
        return true;
      }
    }
    return false;
  };

  const gameDrawn = () => {
    let counter = 0;
    const boardElements = document.getElementById('board').children;
    const boardArray = Array.from(boardElements);
    boardArray.forEach((elem) => {
      if (elem.innerHTML !== '') {
        counter += 1;
      }
    });
    if ((counter === 9) && !gameWon()) {
      return true;
    }
    return false;
  };

  const resetGame = () => {
    players = [];
    gameboard.playArea[0][0] = '';
    gameboard.playArea[0][1] = '';
    gameboard.playArea[0][2] = '';
    gameboard.playArea[1][0] = '';
    gameboard.playArea[1][1] = '';
    gameboard.playArea[1][2] = '';
    gameboard.playArea[2][0] = '';
    gameboard.playArea[2][1] = '';
    gameboard.playArea[2][2] = '';

    const playerInfo = document.forms['player-input'];
    playerInfo.classList.remove('hidden');
    const alerts = document.getElementById('alerts');
    alerts.innerHTML = '';

    const container = document.getElementById('container');
    const board = document.getElementById('board');
    container.removeChild(board);
    gameboard.render();
    return (gameboard.playArea, players);
  };

  const currentPlayer = (array) => {
    var playerOne = array[0];

    if (playerOne.moveNumber % 2 == 1) {
      return Object.assign({}, array[0]);
    } else {
      return Object.assign({}, array[1]);
    };
  };

  const getEvents = () => {
    const boardElements = document.getElementById('board').children;
    const boardArray = Array.from(boardElements);
    boardArray.forEach((elem) => {
      const clickEvent = () => {
        currentPlayer(players);
        elem.innerHTML = `${currentPlayer(players).symbol}`;
        gameboard.updateBoard(elem.id, currentPlayer(players).symbol);
        elem.removeEventListener('click', clickEvent, false);
        players[0].moveNumber += 1;
        players[1].moveNumber += 1;
        if (gameWon()) {
          players[0].moveNumber -= 1;
          players[1].moveNumber -= 1;
          const alerts = document.getElementById('alerts');
          alerts.innerHTML = `${currentPlayer(players).name} is the winner`;
          players = [];
        } else if (gameDrawn()) {
          const alerts = document.getElementById('alerts');
          alerts.innerHTML = 'It\'s a drawn game!';
        } else {
          alerts.innerHTML = `${currentPlayer(players).name}'s turn`;
        }
      }
      if (elem.innerHTML == '') {
        elem.addEventListener('click', clickEvent, false);
      }
    });
  };
  const getPlayerInfo = () => {
    const playerInfo = document.forms['player-input'];
    playerInfo.addEventListener('submit', ((e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(playerInfo).entries());
      addPlayer(data['name-1'], data['name-2']);
      getEvents();
      playerInfo.reset();
      playerInfo.classList.add('hidden');
    }));
  };
  return {getPlayerInfo, resetGame};
})();

// Start/Re-start button

const starter = document.getElementById('starter');
starter.textContent = 'Start Game';

const startGame = () => {
  gameboard.render();
  const input = document.getElementById('input');
  const board = document.getElementById('board');
  input.classList.remove('hidden');
  board.classList.remove('hidden');
  starter.textContent = 'Restart Game';
  starter.removeEventListener('click', startGame, false);
  starter.addEventListener('click', () => {
    gameFlow.resetGame();
  });
}
const commence = () => {
  if (starter.textContent === 'Start Game') {
    starter.addEventListener('click', startGame, false);
  }
}
commence();
gameFlow.getPlayerInfo();
