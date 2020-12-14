const makeMoveDOM = document.getElementById('makeMove');
const movesMadeDOM = document.getElementById('movesMade');

let movementsMade = 0;

makeMoveDOM.onclick = function(){
    movementsMade +=1;
    movesMadeDOM.innerHTML = movementsMade;
};


// let clickedCell = document.querySelector(".singleCell");
// clickedCell.onclick = function(e) {
//     e.preventDefault();
//     console.log(e.target);
// };