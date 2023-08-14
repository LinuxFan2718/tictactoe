import { BoardType } from "../BoardType";

export type PlayerType = {
  'X': 'human' | 'bot',
  'O': 'human' | 'bot'
}
export type GameState =
  | { kind: 'Finished'; winner: 'O' | 'X' | null; board: BoardType; }
  | { kind: 'InProgress'; turn: 'O' | 'X'; playertype: PlayerType; board: BoardType; }