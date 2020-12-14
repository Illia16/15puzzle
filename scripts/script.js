import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timerInit } from './helpers/timer.js';

// Making moves logic
import './logic/makeMove.js';
import './logic/gameBoard.js';

const puzzleGame = {};

document.addEventListener("DOMContentLoaded", function() {
    puzzleGame.init();
});

puzzleGame.init = function() {
    puzzleGame.stats= playersStats;
    console.log(puzzleGame);
};


puzzleGame.startGameBtn = document.getElementById('startGame');
puzzleGame.gameOver = document.getElementById('done');


puzzleGame.startGameBtn.onclick = function(e) {
    e.preventDefault();

    const playerName = document.getElementById('name').value;

    if (!playerName || playerName.length > 15) {
        alert('Invalid name');
    } else {
        puzzleGame.playerName = playerName;
        // puzzleGame.movementsMade = 0;
        // playersStats[playerName] = {
        //     name: playerName,
        //     movementsMade: puzzleGame.movementsMade,
        //     time: 222,
        // };
        startTimer();
    };
};


puzzleGame.gameOver.onclick = function(){
    stopTimer(timerInit);
};