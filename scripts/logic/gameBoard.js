const gameBoard = document.querySelector(".gameBoard");

const cells = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort( () => Math.random()-0.5).concat(0);

export function placeCells(){

    for (let i=0; i<16; i++) {
        const cell = document.createElement('div');
        cell.className = 'singleCell';
        cell.innerHTML = cells[i];
        gameBoard.append(cell);
    };

    console.log(cells);
};