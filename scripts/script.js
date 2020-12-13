import playersStats from './playersStats.js';

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
puzzleGame.timeSpent = document.getElementById('timeSpent');



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
        puzzleGame.gameStarted = true;
        puzzleGame.timerStart = setInterval(puzzleGame.timer, 1000);
    };
};



puzzleGame.activeTime = 0;
puzzleGame.timer = function() {
    puzzleGame.activeTime +=1;
    
    if (puzzleGame.activeTime <= 9) {
        puzzleGame.timeSpent.innerHTML = '0' + puzzleGame.activeTime;
    } else if (puzzleGame.activeTime > 60 ) {
        puzzleGame.timeSpent.innerHTML = `0${Math.floor(puzzleGame.activeTime/60)}:${puzzleGame.activeTime - Math.floor(puzzleGame.activeTime/60) * 60}`
    } else {
        puzzleGame.timeSpent.innerHTML = puzzleGame.activeTime;
    }

    !puzzleGame.gameStarted && clearInterval(puzzleGame.timerStart);
};


puzzleGame.makeMove.onclick = function(){
    puzzleGame.movementsMade +=1;
    puzzleGame.movesMade.innerHTML = puzzleGame.movementsMade;
};

puzzleGame.gameOver.onclick = function(){
    puzzleGame.gameStarted = false;
};


