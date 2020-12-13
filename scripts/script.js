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




puzzleGame.timer = function() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    seconds +=1;
    puzzleGame.timeSpent.innerHTML = seconds;
    console.log('1 sec');
    !puzzleGame.gameStarted && clearInterval(puzzleGame.timerStart);
}


puzzleGame.makeMove.onclick = function(){
    puzzleGame.movementsMade +=1;
    puzzleGame.movesMade.innerHTML = puzzleGame.movementsMade;
};

puzzleGame.gameOver.onclick = function(){
    puzzleGame.gameStarted = false;
};


