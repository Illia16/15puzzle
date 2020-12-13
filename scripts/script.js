import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timer } from './helpers/timer.js';


const puzzleGame = {};

document.addEventListener("DOMContentLoaded", function() {
    puzzleGame.init();
});

puzzleGame.init = function() {
    puzzleGame.stats= playersStats;
    console.log(puzzleGame);
};


puzzleGame.startGameBtn = document.getElementById('startGame');
puzzleGame.makeMove = document.getElementById('makeMove');
puzzleGame.gameOver = document.getElementById('done');

puzzleGame.movesMade = document.getElementById('movesMade');



puzzleGame.startGameBtn.onclick = function(e) {
    e.preventDefault();

    const playerName = document.getElementById('name').value;

    if (!playerName) {
        alert('Invalid name');
    } else {
        puzzleGame.playerName = playerName;
        puzzleGame.movementsMade = 0;
        playersStats[playerName] = {
            name: playerName,
            movementsMade: puzzleGame.movementsMade,
            time: 222,
        };
        puzzleGame.timerStart = setInterval(timer, 1000);
    };
};


puzzleGame.makeMove.onclick = function(){
    puzzleGame.movementsMade +=1;
    puzzleGame.movesMade.innerHTML = puzzleGame.movementsMade;
};

puzzleGame.gameOver.onclick = function(){
    stopTimer(puzzleGame.timerStart);
};


