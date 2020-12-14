const gameBoard = document.querySelector(".gameBoard");

export function placeCells(array){

    for (let i=0; i<16; i++) {
        const cell = document.createElement('div');

        if (array[i] === 0) {
            cell.classList.add('singleCell', 'hole');
        } else {
            cell.className = 'singleCell';
        }
        
        cell.innerHTML = array[i];
        gameBoard.append(cell);
    };
};