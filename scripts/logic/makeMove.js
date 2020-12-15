const movesMadeDOM = document.getElementById('movesMade');
document.querySelector(".gameBoard").addEventListener('click', makeMove);

export let movementsMade = 0;
let holeCell, clickedCell;

export function makeMove(e){
    holeCell = document.querySelector('.hole');
    clickedCell = e.target;

    movementsMade +=1;
    movesMadeDOM.innerHTML = `Moves made: ${movementsMade}`;

    updateDOM(clickedCell, holeCell);
};

function updateDOM(clickedEl, zeroEl){
    // Replacing 0 cell with clicked cell
    zeroEl.innerHTML = clickedEl.innerHTML;
    zeroEl.classList.remove('hole');

    // Replacing clicked cell with 0 cell
    clickedEl.innerHTML = 0;
    clickedEl.classList.add('singleCell', 'hole');
};

export function updateArray(arr){

    const zero = parseInt(holeCell.innerHTML);
    const clickedEl = parseInt(clickedCell.innerHTML);

    arr[arr.indexOf(clickedEl)] = zero;
    arr[arr.indexOf(zero)] = clickedEl;

    return arr;
};