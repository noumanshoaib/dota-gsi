import Picks from "./picks";
import Bans from "./bans";

const Team = ({ data = {}, teamPickOrBan = {}}) => {
  const { bans = [], picks = [], teamName = ""} = data;
  let isBlinkBan = false;
  let isBlinkPick = false;

  if(teamPickOrBan.activeTeam !== 0 && teamPickOrBan.activeTeam === teamName) {
     teamPickOrBan.pick === true ? (isBlinkPick = true): (isBlinkBan = true);
  }

  return (
    <div className="team_container">
      <Bans data={bans} isBlinkBan={isBlinkBan} />
      <Picks data={picks} isBlinkPick={isBlinkPick}/>
    </div>
  );
};

export default Team;
