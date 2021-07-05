import React from "react";
import { useEffect, useState, useRef } from "react";
import "./styles/index.scss";
import Button from "./components/Button";
// helpers
import checkIfGameOver from './components/checkIfGameOver';
import checkIfCellMovable from './components/checkIfCellMovable';
import convertTime from './components/convertTime';
import uniqid from 'uniqid';

function App() {
  const [playersData, setPlayersData] = useState();
  // [{name: 'Illia', time: 123, moves: 123, id:'1'}, {name: 'Illia', time: 123, moves: 123, id:'2'}]
    
  const [gameStarted, setGameStarted] = useState(false);
  const [results, setResults] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerMoves, setMoves] = useState(0);
  const [playerTime, setTime] = useState(0);
  const timer = useRef(null);

  const [allCells, setAllCells] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

  const startGame = () => {
    if (playerName) {
      setGameStarted(true);
      setResults(false);
      setMoves(0);
      endTimer();
      setTime(0);
      startTimer();
    }

    setAllCells(allCells.sort(() => Math.random()-.5).concat());
  };

  const makeMove = (e) => {
    const holePosition = document.querySelector('.hole').className.split(" ")[2];
    const clickedCellPostion = e.target.className.split(" ")[2];

    const mapHole = new Map([ [holePosition[0], holePosition[1]], [holePosition[2], holePosition[3]] ]);
    const holePositionData = Object.fromEntries(mapHole);
    // console.log('holePositionData', holePositionData);
    const mapClickedCell = new Map([ [clickedCellPostion[0], clickedCellPostion[1]], [clickedCellPostion[2], clickedCellPostion[3]] ]);
    const clickedCellPositionData = Object.fromEntries(mapClickedCell);
    // console.log('clickedCellPositionData', clickedCellPositionData);


    if (checkIfCellMovable(clickedCellPositionData, holePositionData)) {
      setMoves(playerMoves+1)
      const clickedCell = Number(e.target.value)
      const indexClickedCell = allCells.indexOf(clickedCell);
      const indexHole = allCells.indexOf(0);
      
      const newArr = [...allCells];
      newArr[indexClickedCell] = 0;
      newArr[indexHole] = clickedCell;
      setAllCells(newArr);

      if (checkIfGameOver(newArr)) {
        endTimer()
        setGameStarted(false)
        setResults(true)
        postData()
      }
    }
  };

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((playerTime)=> playerTime+1)
    }, 1000);
  }

  const endTimer = () => {
    clearInterval(timer.current)
  }

  const postData = () => {
    try {
      fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api", {
        method: 'POST',
        headers: {
            "x-api-key": process.env.REACT_APP_API_KEY || secret.VITE_API_KEY,
        },
        body: JSON.stringify({moves: String(playerMoves+1), time: String(playerTime), id: uniqid('game-15-player-'), name: playerName}),
      })
      .then(res => res.json())
      .then(data => {
        setPlayersData(data)
        console.log('new data', data);
      })
    } catch (er) {
      console.error(er);
    }
  }
  
  useEffect(() => {
    try {
      fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api",
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY || secret.VITE_API_KEY,
          }
        }
      )
      .then(res => res.json())
      .then(data => {
        setPlayersData(data)
        console.log('data', data);
      })
    } catch (er) {
      console.error(er);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-yellow-400 px-10 py-5 min-h-screen text-black text-base text-center">
          <h1 className="text-4xl md:text-7xl py-4">15 Game</h1>

          {!gameStarted && !results &&
          <div className="userName">
            <p>Please, enter your name to begin:</p>
            <input type="text" onChange={(e) => setPlayerName(e.target.value)} />
            <button onClick={startGame}>Play</button>
          </div>
          }
      
          {playersData && playersData.length ?
              <div className="table">
                <h2>Leaderboard</h2>
                <table>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Moves</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playersData.map((playerData) => {
                      return(
                        <tr key={playerData.id} className="text-center">
                            <td>{playerData.name}</td>
                            <td>{convertTime(playerData.time)}</td>
                            <td>{playerData.moves}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          : <div className="py-4">Loading data...</div>  
          }

          {gameStarted &&
            <div className="py-4">
              <div>Name: {playerName}</div>
              <div>Time: {convertTime(playerTime)}</div>
              <div>Moves made: {playerMoves}</div>
              <div className="gameBoard">
                {allCells.map((cell, i)=><Button cell={cell} key={`cell${cell}`} value={cell} functionHandler={(e)=>makeMove(e)} cellClass={i}></Button>)}
              </div>
            </div>
          }

          {results &&
            <div className="py-4">
              <p className="py-2">Here's {playerName} game results:</p>
              <ul className="py-2">
                <li>Moves made: {playerMoves}</li>
                <li>Time: {convertTime(playerTime)}</li>
              </ul>
              <button onClick={startGame}>Start Over</button>
            </div>
          }
    </div>
  );
}

export default App;
