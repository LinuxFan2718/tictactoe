import React from 'react';
import { GameState } from './types/GameState';
import { GameMode } from './types/GameMode';

interface ScoreBoardProps {
  gameState: GameState;
  gameMode: GameMode;
}

function ScoreBoard({ gameState, gameMode }: ScoreBoardProps) {
  return (
      <div className='ScoreBoard'>
        state = {gameState.kind} <br />
        mode = {gameMode}
      </div>
    )
}

export default ScoreBoard;
