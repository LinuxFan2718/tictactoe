export type GameState =
  | { kind: 'Finished'; winner: 'O' | 'X' | null }
  | { kind: 'InProgress'; turn: 'O' | 'X' }
  | { kind: 'Start'; }