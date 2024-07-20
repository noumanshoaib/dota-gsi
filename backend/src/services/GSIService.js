'use strict'

const { secondsToTimer } = require("../util/dateTimeHelper")


const transformOutput = async (payload) => {
    const teamTwoPlayer = payload?.player?.team2 ?? [];
    const teamThreePlayer = payload?.player?.team3 ?? [];
    const teamTwoHero = payload?.hero?.team2 ?? [];
    const teamThreeHero = payload?.hero?.team3 ?? [];
    const teamTwo = payload?.draft?.team2 ?? [];
    const teamThree = payload?.draft?.team3 ?? [];
    const activeTeamTimeRemaining = payload?.draft?.activeteam_time_remaining ?? 0;
    const radiantBonusTime = payload?.draft?.radiant_bonus_time ?? 0;
    const direBonusTime = payload?.draft?.dire_bonus_time ?? 0;
    const pick = payload?.draft?.pick ?? false;
    const activeteam = payload?.draft?.activeteam ?? 0;

    const output = {
        activeTeam: activeteam !== 0 ? activeteam === 2 ? "radiant" : "dire": 0,
        pick,
        activeTeamTimeRemaining: secondsToTimer(activeTeamTimeRemaining),
        team2: await transformTeam(teamTwo, teamTwoHero, teamTwoPlayer, radiantBonusTime, "radiant"),
        team3: await transformTeam(teamThree, teamThreeHero, teamThreePlayer, direBonusTime, "dire")
    };

    return output;
}

const transformTeam = async (team, heros, players, timer, teamName) => {
  return {
    teamName,
    bonusTime: secondsToTimer(timer),
    homeTeam: team.home_team ?? false,
    picks: Array.from({ length: 5 }, (_, i) => ({
      id: team[`pick${i}_id`] ?? 0,
      class: team[`pick${i}_class`] ?? "",
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
      id: team[`ban${i}_id`] ?? 0,
      class: team[`ban${i}_class`] ?? "",
      image: team[`ban${i}_class`] ? `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${team[`ban${i}_class`]}_full.png`: '',
    }))
  };
};

const ingestGameStats = async (fastify, payload) => {

  const output = await transformOutput(payload)

  fastify.io.emit("draft-update", output)

  return output
}

module.exports = {
  ingestGameStats
}
