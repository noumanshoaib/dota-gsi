'use strict'

const { secondsToTimer } = require("../util/dateTimeHelper")

const transformTeam = (team, heros, players, timer) => {
  return {
    bonusTime: secondsToTimer(timer),
    home_team: team.home_team,
    picks: Array.from({ length: 5 }, (_, i) => ({
      id: team[`pick${i}_id`],
      class: team[`pick${i}_class`],
      image: team[`pick${i}_class`] ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${team[`pick${i}_class`]}_full.png`: '',
      pickedBy: Object.entries(players).reduce((acc, [id]) => {
              if(team[`pick${i}_id`] == heros[id]['id'] && team[`pick${i}_id`] !== 0) {
                acc = {
                    playerId: id,
                    name: players[id]['name'],
                    teamName: players[id]['team_name'],
                  }
              }
              return acc
        }
      , {})
    })),
    bans: Array.from({ length: 7 }, (_, i) => ({
      id: team[`ban${i}_id`],
      class: team[`ban${i}_class`],
      image: team[`ban${i}_class`] ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${team[`ban${i}_class`]}_full.png`: '',
    }))
  };
};

const ingestGameStats = async (fastify, payload) => {
    const playerTeam2 = payload?.player?.team2 ?? [];
    const playerTeam3 = payload?.player?.team3 ?? [];
    const heroTeam2 = payload?.hero?.team2 ?? [];
    const heroTeam3 = payload?.hero?.team3 ?? [];
    const team2 = payload?.draft?.team2 ?? [];
    const team3 = payload?.draft?.team3 ?? [];
    const activeTeamTimeRemaining = payload?.draft?.activeteam_time_remaining ?? 0;
    const radiantBonusTime = payload?.draft?.radiant_bonus_time ?? 0;
    const direBonusTime = payload?.draft?.dire_bonus_time ?? 0;
    const pick = payload?.draft?.pick ?? false;
    const activeteam = payload?.draft?.activeteam;

  const output = {
      activeteam,
      pick,
      activeTeamTimeRemaining: secondsToTimer(activeTeamTimeRemaining),
      team2: transformTeam(team2, heroTeam2, playerTeam2, radiantBonusTime),
      team3: transformTeam(team3, heroTeam3, playerTeam3, direBonusTime)
    };

  fastify.io.emit("draft-update", output)

  return output
}

module.exports = {
  ingestGameStats
}
