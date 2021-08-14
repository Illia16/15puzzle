import Head from 'next/head'
import React, {useEffect, useState, useRef} from 'react'
import Button from "../components/Button";
import HowToPlay from "../components/HowToPlay";
import checkIfGameOver from '../utils/checkIfGameOver';
import checkIfCellMovable from '../utils/checkIfCellMovable';
import sortBy from '../utils/sortBy';
import convertTime from '../utils/convertTime';
import uniqid from 'uniqid';

export default function Home() {
  const [playersData, setPlayersData] = useState();
  // [{name: 'Andrew', time: 123, moves: 123, id:'1'}, {name: 'Illia', time: 123, moves: 123, id:'2'}]
    
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(null);

  const [results, setResults] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerMoves, setMoves] = useState(0);
  const [playerTime, setTime] = useState(0);
  const timer = useRef(null);

  const [allCells, setAllCells] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

  // sorting states
  const [sortedByTimeAsc, setsortedByTimeAsc ] = useState(false)
  const [sortedByMoves, setsortedByMoves ] = useState(false)
  const [sortedByName, setsortedByName ] = useState(false)

  const startGame = () => {
    const existingPlayer = playersData.find(player => player.name === playerName);

    if (!playerName) {
      const input = document.querySelector('#playerName')
      if (input) input.classList.add('invalid-input');

      setTimeout(() => {
        input.classList.remove('invalid-input');
      }, 1750);
      return
    }

    if (playerName) {
      setGameStarted(true);
      setGameOver(false)
      if(!existingPlayer){
        setPlayerId(uniqid('game-15-player-'));
      } else {
        setPlayerId(existingPlayer.id)
      }
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
    const mapClickedCell = new Map([ [clickedCellPostion[0], clickedCellPostion[1]], [clickedCellPostion[2], clickedCellPostion[3]] ]);
    const clickedCellPositionData = Object.fromEntries(mapClickedCell);

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
        setGameOver(true)
      }
    }
  };

  useEffect(()=>{
    if (gameOver){
      endTimer()
      setGameStarted(false)
      setResults(true)
      postData()
    }
  },[gameOver])

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
      fetch("/api/leaderboard-post", {
        method: 'POST',
        body: JSON.stringify({moves: String(playerMoves), time: String(playerTime), id: playerId, name: playerName})
      })
      .then(res => res.json())
      .then(data => {
        // console.log('data from post',data);
        setPlayersData(data)
      })
    } catch (er) {
      console.error(er);
    }
  }
  
  // fetch data on load START
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("/api/leaderboard", {
          method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
          // console.log('data',data);
          setPlayersData(data)
        })
      } catch (er) {
        console.error(er);
      }
    }

    fetchData();
  }, []);
  // fetch data on load END

  const sort = (e) => {
    const inputName = e.target.name;

    if ( inputName === 'time'){
      setsortedByTimeAsc(!sortedByTimeAsc);
      const res = sortBy(playersData, inputName, sortedByTimeAsc);
      setPlayersData(res);
    } else if (inputName === 'moves'){
      setsortedByMoves(!sortedByMoves);
      const res = sortBy(playersData, inputName, sortedByMoves);
      setPlayersData(res)
    } else if (inputName === 'name'){
      setsortedByName(!sortedByName);
      const res = sortBy(playersData, inputName, sortedByName);
      setPlayersData(res)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-yellow-400 px-10 py-5 min-h-screen text-black text-base text-center">
        <Head>
          <title>15 puzzle game</title>
          <meta name="description" content="15 puzzle game" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

          <h1 className="text-4xl md:text-7xl py-4">15 Game</h1>

          {!gameStarted && !results &&
          <div className="userName">
            <p>Please, enter your name to begin:</p>
            <label htmlFor="playerName">
              <input 
                type="text" 
                name='playerName' 
                id='playerName' 
                aria-label='enter player name'
                className='w-full'
                onChange={(e) => setPlayerName(e.target.value)} />
            </label>
            <button onClick={startGame} className='play-btn'>Play</button>
            <HowToPlay />
          </div>
          }

      
          {playersData && playersData.length && !gameStarted ?
              <div className="table">
                <h2>Leaderboard</h2>
                <table>
                  <thead>
                    <tr>
                        <th>
                          <div>
                            <span>Name</span>
                            <button 
                              className={`sort-button ${sortedByName ? 'descending' : 'ascending'}`} 
                              aria-label={`sort players by name in ${sortedByName ? 'descending order' : 'ascending order'}`}
                              name='name'
                              onClick={sort}
                            ></button>
                          </div>
                        </th>
                        <th>
                          <div>
                            <span>Time</span>
                            <button 
                              className={`sort-button ${sortedByTimeAsc ? 'descending' : 'ascending'}`} 
                              aria-label={`sort players by time in ${sortedByTimeAsc ? 'descending order' : 'ascending order'}`}
                              name='time'
                              onClick={sort}
                            ></button>
                          </div>
                        </th>
                        <th>
                          <div>
                            <span>Moves</span>
                            <button 
                              className={`sort-button ${sortedByMoves ? 'descending' : 'ascending'}`} 
                              aria-label={`sort players by moves in ${sortedByMoves ? 'descending order' : 'ascending order'}`}
                              name='moves'
                              onClick={sort}
                            ></button>
                          </div>
                        </th>
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
          : !gameStarted ? <div className="py-4">Loading data...</div> : null
          }

          {gameStarted &&
            <div className="py-4">
              <div>Name: {playerName}</div>
              <div>Time: {convertTime(playerTime)}</div>
              <div>Moves made: {playerMoves}</div>
              <div className="gameBoard">
                {allCells.map((cell, i)=><Button cell={cell} key={`cell${cell}`} functionHandler={(e)=>makeMove(e)} cellClass={i}></Button>)}
              </div>
            </div>
          }

          {results &&
            <div className="py-4">
              <p className="py-2">{playerName}, here is your game result:</p>
              <ul className="py-2">
                <li>Moves made: {playerMoves}</li>
                <li>Time: {convertTime(playerTime)}</li>
              </ul>
              <button onClick={startGame} className='start-over-btn'>Start Over</button>
            </div>
          }
    </div>
  )
}