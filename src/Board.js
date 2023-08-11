import { useEffect, useState } from "react";

function Board({gameState, setGameState}) {
  const [board, setBoard] = useState(
    [[null, null, null],
    [null, null, null],
    [null, null, null]]
  );
  const [isXNext, setIsXNext] = useState(true);
  const handleCellClick = (row, col) => {
    if (gameState !== 'playing' || board[row][col] !== null) return; // cell already filled
    
    const newBoard = board.map((r, rowIndex) => 
      r.map((c, colIndex) => 
        rowIndex === row && colIndex === col ? (isXNext ? 'X' : 'O') : c
      )
    );

    setBoard(newBoard);
    setIsXNext(!isXNext); // Toggle the turn
  }

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
    
  }, [board, gameState, setGameState]);

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