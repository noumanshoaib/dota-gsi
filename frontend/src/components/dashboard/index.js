import {useEffect, useState} from "react";
import Team from "../team";
import Score from "../score";

import socketIO from 'socket.io-client';
import mockData from "../../mocks";

const socket = socketIO.connect(process.env.REACT_APP_SOCKET_SERVER_URL);


const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const { team2 = {}, team3 ={ }, activeTeamTimeRemaining = 0, pick = false , activeteam = 0 } = data;
  const {bonusTime: radiantBonusTime = 0 } = team2;
  const {bonusTime: direBonusTime = 0 } = team3;

  const scoreTimerObject = {
    direBonusTime,
    radiantBonusTime,
    activeteam,
    pick,
    activeTeamTimeRemaining
  };

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
        <Team data={team2} />
        <Score data={scoreTimerObject} />
        <Team data={team3} />
      </div>
    </div>
  );
};

export default Dashboard;