import { useEffect, useState } from 'react';
import './styles/index.scss';

function App() {
  const [playersData, setPlayersData] = useState(null);
  
  useEffect(()=> {
      try {
        fetch("API URL HERE")
        .then(res => res.json())
        .then(data => {
          setPlayersData(data)
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
