import Picks from "./picks";
import Bans from "./banners";

const Team = ({ data = {} }) => {
  const { bans = [], picks = [], playerSelectedHero = []} = data;

  return (
    <div className="team_container">
      <Bans data={bans} />
      <Picks data={[picks, playerSelectedHero]} />
    </div>
  );
};

export default Team;
