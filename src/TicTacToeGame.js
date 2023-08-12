import Board from './Board';
import GameState from './GameState';
import { useState } from 'react';

function TicTacToeGame({ gameMode }) {
  const [gameState, setGameState] = useState('playing'); // 'playing', 'X', 'O', 'draw'
  return (
    <div>
      <div className='GameMode'>game mode = {gameMode}</div>
      <Board gameState={gameState} setGameState={setGameState} />
      <GameState gameState={gameState} />
    </div>
  )
}

export default TicTacToeGame
