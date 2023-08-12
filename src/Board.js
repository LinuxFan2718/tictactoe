import { useEffect, useState, useRef, useMemo } from "react";
import random_bot from './bots/random_bot';

function Board({gameState, setGameState, gameMode, board, setBoard}) {
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0 or 1
  const setPlayers = (gameMode) => {
    if (gameMode === 'player1human') {
      return ['human', 'bot'];
    } else if (gameMode === 'player2human') {
      return ['bot', 'human'];
    } else if (gameMode === '2bots') {
      return ['bot', 'bot'];
    } else if (gameMode === '2humans') {
      return ['human', 'human'];
    }
  }
  const playersRef = useRef(setPlayers(gameMode));
  const letter = useMemo(() => ['X','O'], []);

  const handleCellClick = (row, col) => {
    console.log('playersRef', playersRef);
    console.log('currentPlayer', currentPlayer);
    console.log('board', board)
    if(gameState === 'playing' && playersRef.current[currentPlayer] === 'human') {
      if (board[row][col] === null) {
        let newBoard = [...board];
        newBoard[row][col] = letter[currentPlayer];
        console.log('letter', letter);
        console.log('board', board);
        setBoard(newBoard);
        setCurrentPlayer((currentPlayer + 1) % 2);
      }
    }
  }

  useEffect(() => {
    if (gameState === 'playing' && playersRef.current[currentPlayer] === 'bot') {
      let [row, col] = random_bot(board);
      let newBoard = [...board];
      newBoard[row][col] = letter[currentPlayer];

      setBoard(newBoard);
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  }, [board, setBoard, currentPlayer, playersRef, letter, gameState])


  useEffect(() => {
    function checkWinner() {
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
      setGameState(`winner is ${winner}`);
    } else if (checkDraw()) {
      setGameState('draw');
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