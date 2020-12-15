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
    // if (clickedEl === zeroEl){
    //     return
    // };

    // Replacing 0 cell with clicked cell
    zeroEl.innerHTML = clickedEl.innerHTML;
    zeroEl.classList.remove('hole');

    // Replacing clicked cell with 0 cell
    clickedEl.innerHTML = 0;
    clickedEl.classList.add('singleCell', 'hole');
};

export function updateArray(arr){
    // if (clickedCell.innerHTML === holeCell.innerHTML) {
    //     return
    // };

    const zero = parseInt(holeCell.innerHTML);
    const clickedEl = parseInt(clickedCell.innerHTML);

    // console.log(zero, '0');
    // console.log(clickedEl, 'clickedEl');

    // console.log(holeCell , '0 global');
    // console.log(clickedCell, 'clickedEl global');

    arr[arr.indexOf(clickedEl)] = zero;
    arr[arr.indexOf(zero)] = clickedEl;

    compareArrays(arr);
    return arr;
};


function compareArrays(array){
    const finalArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    console.log(array);

    const isGameOver = (finalArray.length == array.length) && finalArray.every(function(element, index) {
    return element === array[index]; 
    });
    console.log(isGameOver);
};