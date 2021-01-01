// Stats from Firebase
import playersStats from './playersStats.js';

// Timer functions
import { startTimer, stopTimer, timerInit, getTime, currentTimeSeconds } from './helpers/Timer/timer.js';
import { recordFinalTime } from './helpers/Timer/recordFinalTime.js';

// Game logic
import { updateArray, updateDOM, compareArrays, addOneMove} from './logic/makeMove.js';
import { placeCells } from './logic/gameBoard.js';

// Display elements on DOM
import { showPlayerName } from './helpers/DomManipulation/displayName.js';
import { showHideEl } from './helpers/DomManipulation/showHideElementDom.js';

// DOM elements
const form = document.getElementById('playerInputs');
const startGameDOM = document.getElementById('startGame');
const restartGameDOM = document.getElementById('restart');
const playerName = document.getElementById('name');
document.querySelector(".gameBoard").addEventListener('click', makeMove);
const movesMadeDOM = document.getElementById('movesMade');
const playerGameInfo = document.getElementById('playerGameInfo');
const gameBoard = document.querySelector(".gameBoard");

// Game info
// NEED TO KEEP EVERYTHING HERE: currentPlayerName, activeTimeSec, movementsMade to later push into Firebase once game is over.
const stats = playersStats;
let currentPlayerName;
const cells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( () => Math.random()-0.5).concat(0);
let finalTime;


startGameDOM.onclick = function(e) {
    e.preventDefault();
    
    if ( !playerName.value || !isNaN(playerName.value) ) {
        alert('Invalid name');
    } else {
        showHideEl(form);
        showHideEl(playerGameInfo);
        showHideEl(gameBoard.parentElement);
        currentPlayerName = playerName.value;
        showPlayerName(currentPlayerName);
        placeCells(cells, gameBoard);
        startTimer();
    };
};

function makeMove(e){
    const holeCell = document.querySelector('.hole');
    const clickedCell = e.target;

    if ( clickedCell.classList.contains('singleCell') && !clickedCell.classList.contains('hole') ) {
        console.log('runs', clickedCell.classList);
        movesMadeDOM.innerHTML = `Moves made: ${addOneMove()}`;
        updateArray(cells, clickedCell, holeCell);
        updateDOM(clickedCell, holeCell);
        if (compareArrays(cells)) {
            gameOver();
        };
    } else {
        return
    };
};

const gameOver = function(){
    stopTimer(timerInit);
    finalTime = recordFinalTime(currentTimeSeconds(false));
    alert(`You won. Movements: ${addOneMove()-1}. Time: ${getTime(currentTimeSeconds(false))} `);

    showHideEl(gameBoard.parentElement);
    showHideEl(restartGameDOM.parentElement);
};

restartGameDOM.onclick = function(){
    showHideEl(form);
    showHideEl(playerGameInfo);
    showHideEl(restartGameDOM.parentElement);
};


// document.addEventListener("DOMContentLoaded", function() {
//     return null
// });