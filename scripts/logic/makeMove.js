export function updateDOM(clickedCell, holeCell){
    // Replacing 0 cell with clicked cell
    holeCell.innerHTML = clickedCell.innerHTML;
    holeCell.classList.remove('hole');

    // Replacing clicked cell with 0 cell
    clickedCell.innerHTML = 0;
    clickedCell.classList.add('singleCell', 'hole');
};

export function updateArray(arr, clickedCell, holeCell){
    const zero = parseInt(holeCell.innerHTML);
    const clickedEl = parseInt(clickedCell.innerHTML);
    const zeroIndex = arr.indexOf(zero);
    const clickedElIndex = arr.indexOf(clickedEl);

    arr[clickedElIndex] = zero;
    arr[zeroIndex] = clickedEl;

    return arr;
};


export function compareArrays(array){
    const finalArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

    const isGameOver = (finalArray.length == array.length) && finalArray.every(function(el, index) {
        return el === array[index];
    });
    return isGameOver;
};

const movementsMade = (count = 0) => {
    return function() {
        return ++count
    };
};

export const addOneMove = movementsMade();