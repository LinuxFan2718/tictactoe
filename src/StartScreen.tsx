import React from "react";
import { GameMode } from "./types/GameMode";

interface StartScreenProps {
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
}

function StartScreen({setGameMode}: StartScreenProps) {
  const handleSelection = (mode: GameMode) => {
    setGameMode(mode);
  }
  return (
    <div className="StartScreen">
      <h1>Choose game mode</h1>
      <div className="GameModeSelector" onClick={() => handleSelection('2humans')}>
        2 human players.
      </div>
      <div className="GameModeSelector" onClick={() => handleSelection('player1human')}>
        Player 1 Human. Player 2 Bot.
      </div>
      <div className="GameModeSelector" onClick={() => handleSelection('player2human')}>
        Player 1 Bot. Player 2 Human.
      </div>
      <div className="GameModeSelector" onClick={() => handleSelection('2bots')}>
        2 bot players.
      </div>
    </div>
  );
}

export default StartScreen