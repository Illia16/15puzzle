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

startGameDOM.onclick = function(e) {
    e.preventDefault();

    const playerName = document.getElementById('name').value;

    if (!playerName || playerName.length > 15) {
        alert('Invalid name');
    } else {
        placeCells();
        currentPlayerName(playerName)
        startTimer();
    };
};


gameOverDOM.onclick = function(){
    stopTimer(timerInit);
};