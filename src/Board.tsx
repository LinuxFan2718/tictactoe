import React from "react";
import { useEffect, useMemo } from "react";
import random_bot from './bots/random_bot';
import { GameState } from './types/GameState';
import { GameMode } from './types/GameMode';
import { BoardType } from './BoardType';

interface BoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameMode: GameMode;
  board: BoardType;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
}

function Board({gameState, setGameState, gameMode, board, setBoard}: BoardProps) {
  const setPlayers = (gameMode: GameMode):  {
    'X': 'human' | 'bot',
    'O': 'human' | 'bot'
  } => {
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
  const playersRef = setPlayers(gameMode);
  const letter = useMemo(() => ['X','O'] as const, []);

  const handleCellClick = (row: number, col: number) => {
    if(gameState.kind === 'InProgress' && playersRef[gameState.turn] === 'human') {
      if (board[row][col] === null) {

        let newBoard = structuredClone(board);
        newBoard[row][col] = gameState.turn;
        setBoard(newBoard);

        setGameState(
          {
            kind: "InProgress",
            turn: gameState.turn === 'X' ? 'O' : 'X'
          })
      }
    }
  }

  useEffect(() => {
    if (gameState.kind === 'InProgress' && playersRef[gameState.turn] === 'bot') {
      let [row, col] = random_bot(board);

      let newBoard = structuredClone(board);
      newBoard[row][col] = gameState.turn;
      setBoard(newBoard);

      setGameState(
        {
          kind: "InProgress",
          turn: gameState.turn === 'X' ? 'O' : 'X'
        })
    }
  }, [board, setBoard, playersRef, letter, gameState, setGameState])


  useEffect(() => {
    function checkWinner(): 'X' | 'O' | null {
      // Check rows, columns and diagonals
      for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return board[i][0];
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return board[0][i];
      }
      
      if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
      if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];
      
      return null;
    }
    function checkDraw() {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j< 3; j++) {
          if (board[i][j] === null) return false;
        }
      }
      return true;
    }

    let winner = checkWinner();
    if (winner) {
      setGameState({ kind: 'Finished', winner: winner });
    } else if (checkDraw()) {
      setGameState({ kind: 'Finished', winner: null });
    };

    
  }, [board, gameState, setGameState, setBoard]);

  return (
    <div className="Board">
      {board.map((row, rowIndex) => (
        <div className='Row' key={rowIndex}>
          {row.map((cell, colIndex) => (
            <button 
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <div className='Cell'>
                {cell || ' '}
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board;