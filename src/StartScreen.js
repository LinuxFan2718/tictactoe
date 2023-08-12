function StartScreen({setGameMode}) {
  const handleSelection = (mode) => {
    setGameMode(mode);
  }
  return (
    <div className="StartScreen">
      <h1>Choose game mode</h1>
      <div className="GameModeSelector" onClick={() => handleSelection('2humans')}>
        2 human players.
      </div>
      <div className="GameModeSelector">
        Player 1 Human. Player 2 Bot.
      </div>
      <div className="GameModeSelector">
        Player 1 Bot. Player 2 Human.
      </div>
      <div className="GameModeSelector">
        2 bot players.
      </div>
    </div>
  );
}

export default StartScreen