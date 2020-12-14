import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timerInit } from './helpers/timer.js';

// Game logic
import './logic/makeMove.js';
import { placeCells } from './logic/gameBoard.js';

const currentPlayerName = (name) => name;
const stats = playersStats;

// DOM elements
const startGameDOM = document.getElementById('startGame');
const gameOverDOM = document.getElementById('done');

const cells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( () => Math.random()-0.5).concat(0);

startGameDOM.onclick = function(e) {
    e.preventDefault();

    const playerName = document.getElementById('name').value;

    if (!playerName || playerName.length > 15) {
        alert('Invalid name');
    } else {
        placeCells(cells);
        currentPlayerName(playerName)
        startTimer();
    };
};


gameOverDOM.onclick = function(){
    stopTimer(timerInit);
};