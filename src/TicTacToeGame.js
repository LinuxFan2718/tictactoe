import Board from './Board';
import GameState from './GameState';
import { useState, useEffect, useMemo } from 'react';

function TicTacToeGame({ gameMode, setGameMode }) {
  const determineInitialState = () => {
    switch(gameMode) {
      case '2humans':
      case 'player1human':
        return 'humanplaying';
      case 'player2human':
      case '2bots':
        return 'botplaying';
      default:
        return 'humanplaying';
    }
  }
  // 'humanplaying', 'botplaying', 'X won', 'O won', 'draw'
  const [gameState, setGameState] = useState(determineInitialState());
  const emptyBoard = useMemo(() => [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ], []);
  const [board, setBoard] = useState(emptyBoard);
  const resetGame = () => {
    setBoard(emptyBoard);
    setGameMode('startscreen');
  }
  useEffect(() => {
    setBoard(emptyBoard);
  }, [gameMode, emptyBoard])
  return (
    <div>
      <GameState gameState={gameState} gameMode={gameMode} />
      <Board 
        gameState={gameState}
        setGameState={setGameState}
        gameMode={gameMode}
        board={board}
        setBoard={setBoard}
      />
      
      <div className='reset' onClick={resetGame}>Reset Game</div>
    </div>
  )
}

export default TicTacToeGame
