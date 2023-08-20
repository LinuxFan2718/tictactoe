import React from 'react';
import StartScreen from './StartScreen';
import TicTacToeGame from './TicTacToeGame';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { GameMode } from './types/GameMode';
import { GameState, PlayerType } from './types/GameState';
import { BoardType } from './BoardType';

function Game() {
  const [gameMode, setGameMode] = useState<GameMode>('startscreen');
  const emptyBoard = useMemo<BoardType>(() => [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ], []);
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
  const determineInitialState = useCallback((): GameState => {
    return { 
      kind: 'InProgress', 
      turn: 'X', 
      playertype: setPlayers(gameMode),
      board: emptyBoard
    }
  },[emptyBoard, gameMode]);

  const resetGame = () => {
    setGameState(determineInitialState());
    setGameMode('startscreen');
  }
  useEffect(() => {
    setGameState(determineInitialState());
  }, [gameMode, emptyBoard, determineInitialState])

  const [gameState, setGameState] = useState(determineInitialState());
  return (
    <div>
      {
      gameMode === 'startscreen' ? 
        <StartScreen setGameMode={setGameMode} /> : 
        <TicTacToeGame 
          gameMode={gameMode} 
          setGameMode={setGameMode}
          gameState={gameState}
          setGameState={setGameState}
          resetGame={resetGame}
        />
      }
    </div>
  )
}

export default Game
