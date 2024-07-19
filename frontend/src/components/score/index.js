const Score = ( { data = {} }) => {
  const {
    direBonusTime,
    radiantBonusTime,
    activeTeamTimeRemaining
  } = data;
  return (
    <div className="score_container">
      <div className="group">GROUP B</div>
      <div className="stats_container">
        <div className="team-container">
          <div className="team">
            <div className="team_name">Radient</div>
            <div className="">{radiantBonusTime}</div>
          </div>
          <div className="team">
            <div className="team_name"></div>
            <div className="">{activeTeamTimeRemaining}</div>
          </div>
          <div className="team">
            <div className="team_name">Dire</div>
            <div className="">{direBonusTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
