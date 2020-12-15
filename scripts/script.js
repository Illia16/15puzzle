// Stats from Firebase
import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timerInit, activeTimeSec } from './helpers/timer.js';

// Game logic
import { movementsMade, makeMove, updateArray} from './logic/makeMove.js';
import { placeCells } from './logic/gameBoard.js';

// DOM elements
const startGameDOM = document.getElementById('startGame');
const gameOverDOM = document.getElementById('done');
const playerName = document.getElementById('name').value;
document.querySelector(".gameBoard").addEventListener('click', () => updateArray(cells));

// Game info
// NEED TO KEEP EVERYTHING HERE: currentPlayerName, activeTimeSec, movementsMade to later push into Firebase once game is over.
const stats = playersStats;
const currentPlayerName = (name) => name;
const cells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( () => Math.random()-0.5).concat(0);
let finalTime = (timeFinal) => timeFinal;
let finalMovementsCount = (movementsCount) => movementsCount;

startGameDOM.onclick = function(e) {
    e.preventDefault();
    
    if (!playerName || playerName.length > 15) {
        alert('Invalid name');
    } else {
        currentPlayerName(playerName);
        placeCells(cells);
        startTimer();
    };
};


gameOverDOM.onclick = function(){
    stopTimer(timerInit);
    finalTime(activeTimeSec);
    finalMovementsCount(movementsMade);
};