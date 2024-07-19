import {useEffect, useState} from "react";
import Team from "../team";
import Score from "../score";

import socketIO from 'socket.io-client';
import mockData from "../../mocks";

const socket = socketIO.connect(process.env.REACT_APP_SOCKET_SERVER_URL);


const Dashboard = () => {
  const [data, setData] = useState({});
  const { team2 = {}, team3 ={ }, activeTeamTimeRemaining = 0, pick = false , activeTeam = 0 } = data;
  const {bonusTime: radiantBonusTime = 0 } = team2;
  const {bonusTime: direBonusTime = 0 } = team3;

  const scoreTimer = {
    direBonusTime,
    radiantBonusTime,
    activeTeamTimeRemaining
  };

  const teamPickOrBan = {
    activeTeam,
    pick,
  }

  //Listens for update draft event
  useEffect(() => {
    socket.on('draft-update', (data) => {
      setData({...data});
    });
    return () => {
      socket.off("draft-update");
    };
  });

  return (
    <div className="app_container">
      <div className="dashboard">
        <Team data={team2} teamPickOrBan={teamPickOrBan}/>
        <Score data={scoreTimer} />
        <Team data={team3} teamPickOrBan={teamPickOrBan} />
      </div>
    </div>
  );
};

export default Dashboard;
