const checkIfCellMovable = (cell, hole) => {
  return ( (Math.abs(cell.x-hole.x) ===1) && cell.y-hole.y===0) || (cell.x-hole.x===0 && (Math.abs(cell.y-hole.y) ===1) );
};

export default checkIfCellMovable;