import React from "react";
import { useEffect, useState } from "react";
import "./styles/index.scss";

function App() {
  const [playersData, setPlayersData] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (playerName) {
      setGameStarted(true);
    }
  };
  
  useEffect(() => {
    // try {
    //   fetch("***********",
    //     {
    //       headers: {
    //         "x-api-key": REACT_APP_API_KEY || secret.VITE_API_KEY,
    //       }
    //     }
    //   )
    //   .then(res => res.json())
    //   .then(data => {
    //     setPlayersData(data)
    //     console.log(data);
    //   })
    // } catch (er) {
    //   console.error(er);
    // }
    // try {
    //   fetch("***********", {
    //     method: 'POST',
    //     headers: {
    //         "x-api-key": REACT_APP_API_KEY,
    //     },
    //     body: JSON.stringify({moves: '1', time: '1', id: '1', name: 'Illia'}),
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     setPlayersData(data)
    //     console.log(data);
    //   })
    // } catch (er) {
    //   console.error(er);
    // }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-7xl">15 Game</h1>
        <div className="userName">
          <input type="text" onChange={(e) => setPlayerName(e.target.value)} />
          <button onClick={startGame}>Ok</button>
        </div>

        <div>{playerName}</div>
      </header>
    </div>
  );
}

export default App;
