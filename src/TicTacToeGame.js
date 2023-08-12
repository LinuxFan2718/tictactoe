import Board from './Board';
import GameState from './GameState';
import { useState, useEffect, useMemo } from 'react';

function TicTacToeGame({ gameMode, setGameMode }) {
  const determineInitialState = () => {
    return 'playing'
  }
  // 'playing', 'playing', 'X won', 'O won', 'draw'
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
