export type GameState =
  | { kind: 'Finished'; winner: 'O' | 'X' | null }
  | { kind: 'InProgress'; turn: 0 | 1 }
  | { kind: 'Start'; }