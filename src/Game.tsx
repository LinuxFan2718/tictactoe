import React from 'react';
import StartScreen from './StartScreen';
import TicTacToeGame from './TicTacToeGame';
import { useState } from 'react';
import { GameMode } from './types/GameMode';

function Game() {
  const [gameMode, setGameMode] = useState<GameMode>('startscreen');
  return (
    <div>
      {
      gameMode === 'startscreen' ? 
        <StartScreen setGameMode={setGameMode} /> : 
        <TicTacToeGame gameMode={gameMode} setGameMode={setGameMode}/>
      }
    </div>
  )
}

export default Game
