import { BoardType } from "../BoardType";

function pick_me_bot(board: BoardType): number[] {
  // Logic to let bot make the first move
  let availableCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j< 3; j++) {
      if (board[i][j] === null) availableCells.push([i, j]);
    }
  }
  if (availableCells.length === 0) {
    throw new Error(`Bot cannot move! ${board}`);
  }
  let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  return randomCell;    
}

export default pick_me_bot