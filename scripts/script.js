// Stats from Firebase
import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timerInit, activeTimeSec, getTime } from './helpers/timer.js';

// Check name
import { checkName } from './helpers/checkName.js';
import { showPlayerName } from './helpers/DomManipulation/displayName.js';

// Record final time
import { recordFinalTime } from './helpers/recordFinalTime.js';

// Game logic
import { updateArray, updateDOM, compareArrays} from './logic/makeMove.js';
import { placeCells } from './logic/gameBoard.js';

// DOM elements
const startGameDOM = document.getElementById('startGame');
const playerName = document.getElementById('name');
document.querySelector(".gameBoard").addEventListener('click', makeMove);
const movesMadeDOM = document.getElementById('movesMade');


// Game info
// NEED TO KEEP EVERYTHING HERE: currentPlayerName, activeTimeSec, movementsMade to later push into Firebase once game is over.
const stats = playersStats;
let currentPlayerName;
let movementsMade = 0;
const cells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( () => Math.random()-0.5).concat(0);
let finalTime;

startGameDOM.onclick = function(e) {
    e.preventDefault();
    
    if (!checkName(playerName.value) || !isNaN(checkName(playerName.value)) ) {
        alert('Invalid name');
    } else {
        currentPlayerName = checkName(playerName.value);
        showPlayerName(currentPlayerName);
        placeCells(cells);
        startTimer();
    };
};

function makeMove(e){
    const holeCell = document.querySelector('.hole');
    const clickedCell = e.target;

    movementsMade +=1;
    movesMadeDOM.innerHTML = `Moves made: ${movementsMade}`;

    updateArray(cells, clickedCell, holeCell);
    updateDOM(clickedCell, holeCell);
    if (compareArrays(cells)) {
        gameOver();
    };
};


const gameOver = function(){
    stopTimer(timerInit);
    finalTime = recordFinalTime(activeTimeSec);
    alert(`You won. Movements: ${movementsMade}. Time: ${getTime(activeTimeSec)} `);
};