import Picks from "./picks";
import Bans from "./bans";

const Team = ({ data = {} }) => {
  const { bans = [], picks = []} = data;

  return (
    <div className="team_container">
      <Bans data={bans} />
      <Picks data={picks} />
    </div>
  );
};

export default Team;
