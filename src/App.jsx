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
    const holePosition = document.querySelector('.hole').className.split(" ")[2];
    const clickedCellPostion = e.target.className.split(" ")[2];

    const mapHole = new Map([ [holePosition[0], holePosition[1]], [holePosition[2], holePosition[3]] ]);
    const holePositionData = Object.fromEntries(mapHole);
    console.log('holePositionData', holePositionData);


    const mapClickedCell = new Map([ [clickedCellPostion[0], clickedCellPostion[1]], [clickedCellPostion[2], clickedCellPostion[3]] ]);
    const clickedCellPositionData = Object.fromEntries(mapClickedCell);
    console.log('clickedCellPositionData', clickedCellPositionData);


    // console.log('holePosition', holePosition[0], holePosition[1], holePosition[2], holePosition[3] );
    // console.log('clickedCellPostion', clickedCellPostion);

    if (clickedCellPositionData.x-holePositionData.x<=1 && clickedCellPositionData.y-holePositionData.y===0 || clickedCellPositionData.x-holePositionData.x===0 && clickedCellPositionData.y-holePositionData.y<=1) {
      // if it's movable
      const clickedCell = Number(e.target.value)
      const indexClickedCell = allCells.indexOf(clickedCell);
      const indexHole = allCells.indexOf(0);
      console.log(indexClickedCell);
      console.log(indexHole);
      
      const newArr = [...allCells];
      newArr[indexClickedCell] = 0;
      newArr[indexHole] = clickedCell;
      setAllCells(newArr)
      setMoves(playerMoves+1);
      console.log(newArr);
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
            {allCells.map((cell, i)=><Button cell={cell} key={`cell${cell}`} value={cell} functionHandler={(e)=>makeMove(e)} cellClass={i}></Button>)}
          </div>
        </div>
    </div>
  );
}

export default App;
