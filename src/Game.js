import StartScreen from './StartScreen';
import TicTacToeGame from './TicTacToeGame';
import { useState } from 'react';

function Game() {
  const [gameMode, setGameMode] = useState('startscreen');
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
