import React from 'react';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import { useState, useEffect, useMemo } from 'react';
import { GameMode } from './types/GameMode';
import { GameState, PlayerType } from './types/GameState';
import { BoardType } from './BoardType';

interface TicTacToeGameProps {
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
}
function TicTacToeGame({ gameMode, setGameMode }: TicTacToeGameProps) {
  const setPlayers = (gameMode: GameMode): PlayerType => {
    switch(gameMode) {
        case 'player1human': return {'X': 'human', 'O': 'bot'};
        case 'player2human': return {'X': 'bot', 'O': 'human'};
        case '2bots': return {'X': 'bot', 'O': 'bot'};
        case '2humans': return {'X': 'human', 'O': 'human'};
        default:
            console.warn('Unexpected game mode:', gameMode);
            return {'X': 'human', 'O': 'human'};
    }
  }
  const determineInitialState = (): GameState => {
    return { kind: 'InProgress', turn: 'X', playertype: setPlayers(gameMode) }
  }
  // 'playing', 'playing', 'X won', 'O won', 'draw'
  const [gameState, setGameState] = useState(determineInitialState());
  const emptyBoard = useMemo<BoardType>(() => [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ], []);
  const [board, setBoard] = useState<BoardType>(emptyBoard);
  const resetGame = () => {
    setBoard(emptyBoard);
    setGameMode('startscreen');
  }
  useEffect(() => {
    setBoard(emptyBoard);
  }, [gameMode, emptyBoard])
  return (
    <div>
      <ScoreBoard gameState={gameState} gameMode={gameMode} />
      <Board 
        gameState={gameState}
        setGameState={setGameState}
        board={board}
        setBoard={setBoard}
      />
      
      <div className='reset' onClick={resetGame}>Reset Game</div>
    </div>
  )
}

export default TicTacToeGame
