import React from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import { GameMode } from './types/GameMode';
import { GameState } from './types/GameState';

interface TicTacToeGameProps {
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  resetGame: any
}
function TicTacToeGame({ gameMode, setGameMode, gameState, setGameState, resetGame }: TicTacToeGameProps) {
  return (
    <div>
      <ScoreBoard gameState={gameState} gameMode={gameMode} />
      <Board 
        gameState={gameState}
        setGameState={setGameState}
      />
      
      <div className='reset' onClick={resetGame}>Reset Game</div>
    </div>
  )
}

export default TicTacToeGame
