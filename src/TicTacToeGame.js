import Board from './Board';
import GameState from './GameState';
import { useState } from 'react';

function TicTacToeGame({ gameMode, setGameMode }) {
  const [gameState, setGameState] = useState('playing'); // 'playing', 'X', 'O', 'draw'
  return (
    <div>
      
      <GameState gameState={gameState} gameMode={gameMode} />
      <Board gameState={gameState} setGameState={setGameState} />
      
      <div className='reset' onClick={() => setGameMode('startscreen')}>Reset Game</div>
    </div>
  )
}

export default TicTacToeGame
