import React from "react";
import { useEffect, useState, useRef } from "react";
import "./styles/index.scss";
import Button from "./components/Button";

function App() {
  const [playersData, setPlayersData] = useState(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerMoves, setMoves] = useState(0);
  const [playerTime, setTime] = useState(0);
  const timer = useRef(null);

  const [allCells, setAllCells] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

  const startGame = () => {
    if (playerName) {
      setGameStarted(true);
      startTimer()
    }

    setAllCells(allCells.sort(() => Math.random()-.5).concat());
  };

  const makeMove = (e) => {
    setMoves(playerMoves+1);
    console.log(e.target.parentNode);
    const clickedCell = Number(e.target.value)
    const indexClickedCell = allCells.indexOf(clickedCell);
    const indexHole = allCells.indexOf(0);
    console.log(indexClickedCell);
    console.log(indexHole);

    const newArr = [...allCells];
    newArr[indexClickedCell] = 0;
    newArr[indexHole] = clickedCell;
    setAllCells(newArr)
    console.log(newArr);


  };

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((playerTime)=> playerTime+1)
    }, 1000);
  }

  const endTimer = () => {
    clearInterval(timer.current)
  }
  
  useEffect(() => {
    // try {
    //   fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api",
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
    //   fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api", {
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
    <div className="max-w-7xl w-[90%] my-0 mx-auto">
        <h1 className="text-7xl">15 Game</h1>

        <div className="userName">
          <input type="text" onChange={(e) => setPlayerName(e.target.value)} />
          <button onClick={startGame}>Ok</button>
        </div>

        <div className='bg-yellow-200'>
          <div>Name: {playerName}</div>
          <div>Time: {playerTime}</div>
          <div>Moves made: {playerMoves}</div>
          <div className="gameBoard">
            {allCells.map((cell)=><Button cell={cell} key={`cell${cell}`} value={cell} functionHandler={(e)=>makeMove(e)} cellClass='additionalClass'></Button>)}
          </div>
        </div>
    </div>
  );
}

export default App;
