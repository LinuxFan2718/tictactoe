import { useState } from "react";

function Board() {
  const [board, setBoard] = useState(
    [[null, null, null],
    [null, null, null],
    [null, null, null]]
  );
  const [isXNext, setIsXNext] = useState(true);
  const handleCellClick = (row, col) => {
    if (board[row][col] !== null) return; // cell already filled
    
    const newBoard = board.map((r, rowIndex) => 
      r.map((c, colIndex) => 
        rowIndex === row && colIndex === col ? (isXNext ? 'X' : 'O') : c
      )
    );

    setBoard(newBoard);
    setIsXNext(!isXNext); // Toggle the turn
  }

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