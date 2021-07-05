const checkIfGameOver = (newArr) => {
    const isGameOver = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0].every(function(el, index) {
      return el === newArr[index];
    });

    console.log(isGameOver);
    return isGameOver;
};

export default checkIfGameOver;