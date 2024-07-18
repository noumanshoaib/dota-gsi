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

  const {
    timer: sec,
    player: {team2: playerTeam2 },
    player: {team3: playerTeam3 },
    hero: {team2: heroTeam2 },
    hero: {team3: heroTeam3 },
    draft: {team2: team2},
    draft: {team3: team3 },
    draft: {activeteam_time_remaining: activeTeamTimeRemaining},
    draft: {radiant_bonus_time: radiantBonusTime},
    draft: {dire_bonus_time: direBonusTime},
    draft: {pick: pick},
    draft: {activeteam: activeteam},
  } = payload

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
