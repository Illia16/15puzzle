const checkIfCellMovable = (clickedCellPositionData, holePositionData) => {
  return ( 
            (clickedCellPositionData.x-holePositionData.x===1 || clickedCellPositionData.x-holePositionData.x===-1) 
            && clickedCellPositionData.y-holePositionData.y===0) 
            || (clickedCellPositionData.x-holePositionData.x===0 
            && 
            (clickedCellPositionData.y-holePositionData.y===1 || clickedCellPositionData.y-holePositionData.y===-1))
};

export default checkIfCellMovable;