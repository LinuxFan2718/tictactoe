import React from "react";
import { useEffect } from "react";
import random_bot from './bots/random_bot';
import { GameState } from './types/GameState';

interface BoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Board({gameState, setGameState}: BoardProps) {

  const handleCellClick = (row: number, col: number) => {
    if(gameState.kind === 'InProgress' && gameState.playertype[gameState.turn] === 'human') {
      if (gameState.board[row][col] === null) {
        let newBoard = structuredClone(gameState.board);
        newBoard[row][col] = gameState.turn;

        setGameState(
          {
            kind: "InProgress",
            turn: gameState.turn === 'X' ? 'O' : 'X',
            playertype: gameState.playertype,
            board: newBoard
          })
      }
    }
  }

  useEffect(() => {
    function checkWinner(): 'X' | 'O' | null {
      if (gameState.kind !== 'InProgress') return null;
      let board = gameState.board;
      for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return board[i][0];
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return board[0][i];
      }
      
      if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
      if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];
      
      return null;
    }
    function checkDraw() {
      if (gameState.kind !== 'InProgress') return false;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j< 3; j++) {
          if (gameState.board[i][j] === null) return false;
        }
      }
      return true;
    };

    let winner = checkWinner();
    if (winner) {
      setGameState({ kind: 'Finished', winner: winner, board: gameState.board });
    } else if (checkDraw()) {
      setGameState({ kind: 'Finished', winner: null, board: gameState.board });
    };

    if (gameState.kind === 'InProgress' && gameState.playertype[gameState.turn] === 'bot') {
      let [row, col] = random_bot(gameState.board);

      let newBoard = structuredClone(gameState.board);
      newBoard[row][col] = gameState.turn;

      setGameState(
        {
          kind: "InProgress",
          turn: gameState.turn === 'X' ? 'O' : 'X',
          playertype: gameState.playertype,
          board: newBoard
        }
      )
    }
  }, [gameState, setGameState]);

  return (
    <div className="Board">
      {gameState.board.map((row, rowIndex) => (
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