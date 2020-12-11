import React, { useEffect, useState } from 'react';

function App() {
  const [playerName, setPlayerName] = useState('');
  const elements = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const [sortedElements, changeOrder] = useState(elements);

  const randomizeArr = (array) => {
    return array.sort( () => Math.random()-.5).concat([0]);
  };

  useEffect(() => {
    randomizeArr(elements);
  }, []);


  const checkUserName = function(name) {    
    if (!name) {
      alert('Invalid name')
    }
  }

  return (
    <div className="App">
      <form action="">
        <input type="text" onChange={ e => setPlayerName(e.target.value) } value={playerName} />
        <button onClick={() => checkUserName(playerName)}>Start</button>
      </form>
    </div>
  );
}

export default App;
