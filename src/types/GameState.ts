

export type PlayerType = {
  'X': 'human' | 'bot',
  'O': 'human' | 'bot'
}
export type GameState =
  | { kind: 'Finished'; winner: 'O' | 'X' | null }
  | { kind: 'InProgress'; turn: 'O' | 'X'; playertype: PlayerType }
  | { kind: 'Start'; }