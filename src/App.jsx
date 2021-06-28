import React from 'react';
import { useEffect, useState } from 'react';
import './styles/index.scss';

function App() {
  const [playersData, setPlayersData] = useState(null);

    useEffect(()=> {
        try {
          fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api",
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY,
              }
            }
          )
          .then(res => res.json())
          .then(data => {
            setPlayersData(data)
            console.log(data);
          })
        } catch (er) {
          console.error(er);
        }
    },[])


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-7xl">App</h1>
      </header>
    </div>
  );
}

export default App;
