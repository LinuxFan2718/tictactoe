import './App.css';
import Board from './Board';
import GameState from './GameState';
import { useState } from 'react';

function App() {

  const [gameState, setGameState] = useState('playing'); // 'playing', 'X', 'O', 'draw'
  return (
    <div className="App">
      <div className='Title'>Tic Tac Toe</div>
      <Board gameState={gameState} setGameState={setGameState} />
      <GameState gameState={gameState} />
      <div className='Footer'>
        <a href="https://cahillanelabs.com/">a cahillanelabs project</a> ⋅&nbsp;
        <a href="https://github.com/LinuxFan2718/tictactoe">source code</a>
      </div>
    </div>
  );
}

export default App;
