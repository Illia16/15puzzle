const movesMadeDOM = document.getElementById('movesMade');
document.querySelector(".gameBoard").addEventListener('click', makeMove);

export let movementsMade = 0;

function makeMove(e){
    console.log(e.target.innerHTML);
    movementsMade +=1;
    movesMadeDOM.innerHTML = movementsMade;
    console.log(movementsMade);
};