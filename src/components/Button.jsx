import React from "react";
import "../styles/index.scss";

const Button = ({cell, functionHandler, value, cellClass}) => {
    let cellPosition;

    const keyBoardSupport = (e) => {
        const pickedCellPostion = e.target.className.split(" ")[2];
        const positionX = pickedCellPostion[1];
        const positionY = pickedCellPostion[3];

        // left arrow press
        if (e.keyCode === 37){
            if (positionX <=4 && positionX > 1){
                document.activeElement.blur()
                document.querySelector(`.x${positionX-1}y${positionY}`).focus();
            }
        }
        
        // right arrow press
        if (e.keyCode === 39){
            if (positionX < 4 && positionX >= 1){
                document.activeElement.blur()
                document.querySelector(`.x${Number(positionX)+1}y${positionY}`).focus();
            }
        }

        // up arrow press
        if (e.keyCode === 38){
            if (positionY <=4 && positionY > 1){
                document.activeElement.blur()
                document.querySelector(`.x${positionX}y${positionY-1}`).focus();
            }
        }

        // down arrow press
        if (e.keyCode === 40){
            if (positionY < 4 && positionY >= 1){
                document.activeElement.blur()
                document.querySelector(`.x${positionX}y${Number(positionY)+1}`).focus();
            }
        }
    }

    switch (cellClass) {
        case 0:
            cellPosition = 'x1y1'
            break;
        case 1:
            cellPosition = 'x2y1'
            break;
        case 2:
            cellPosition = 'x3y1'
            break;
        case 3:
            cellPosition = 'x4y1'
            break;
        case 4:
            cellPosition = 'x1y2'
            break;
        case 5:
            cellPosition = 'x2y2'
            break;
        case 6:
            cellPosition = 'x3y2'
            break;
        case 7:
            cellPosition = 'x4y2'
            break;
        case 8:
            cellPosition = 'x1y3'
            break;
        case 9:
            cellPosition = 'x2y3'
            break;
        case 10:
            cellPosition = 'x3y3'
            break;
        case 11:
            cellPosition = 'x4y3'
            break;
        case 12:
            cellPosition = 'x1y4'
            break;
        case 13:
            cellPosition = 'x2y4'
            break;
        case 14:
            cellPosition = 'x3y4'
            break;
        default:
            cellPosition = 'x4y4'
            break;
    }
    return(
        <button disabled={cell===0} onClick={functionHandler} onKeyDown={keyBoardSupport} value={value} className={`cell ${cell !== 0 ? 'singleCell' : 'hole'} ${cellPosition}`}>{cell}</button>
    )
}

export default Button;