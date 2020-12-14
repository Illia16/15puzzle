const makeMoveDOM = document.getElementById('makeMove');
const movesMadeDOM = document.getElementById('movesMade');

let movementsMade = 0;

makeMoveDOM.onclick = function(){
    movementsMade +=1;
    movesMadeDOM.innerHTML = movementsMade;
};