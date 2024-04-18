const { formatDatePath } = require("./getdate");
const dates = require("./next30");

// Function to get data for given league and return relevant parts
const getGames = async (name, date) => {
  try {
    let gamesForDay = [];
    let requestURL = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${date.formatDateAPI}%2FstartDate%2F${date.formatDateAPI}%2FtodayDate%2F${date.formatDateAPI}%2Ftournament%2Ffull-priority-order%2Fversion%2F2.4.6?timeout=5`;
    const data = await fetch(requestURL);
    const json = await data.json();

    let leagueRoute = json.payload[0].body.matchData;

    for (let league of leagueRoute) {
      if (league.tournamentMeta.tournamentSlug == name) {
        league =
          league.tournamentDatesWithEvents[date.formatDatePath][0].events;
        for (let game of league) {
          let gameData = {
            date: date.formatDateAPI,
            league: game.tournamentName.full,
            startTime: game.startTimeInUKHHMM,
            homeNameAbbrv: game.homeTeam.name.abbreviation,
            homeNameFull: game.homeTeam.name.full,
            homeScore: game.homeTeam.scores.score,
            homeResult: game.homeTeam.eventOutcome,
            awayNameAbbrv: game.awayTeam.name.abbreviation,
            awayNameFull: game.awayTeam.name.full,
            awayScore: game.awayTeam.scores.score,
            awayResult: game.awayTeam.eventOutcome,
            venue: game.venue.name.full,
          };
          gamesForDay.push(gameData);
        }
        return gamesForDay;
      }
    }

    // If league not found, throw custom error
    throw new Error(`League '${name}' not found`);
  } catch (error) {
    console.error(
      `Error getting data for ${name}: ${error.message} on ${date.formatDatePath}`
    );
    return [];
  }
};

// Function to fetch and log games for each date
const fetchGamesForDates = async () => {
  try {
    let allGames = [];
    for (let date of dates) {
      const games = await getGames("premier-league", date);
      allGames.push(...games);
    }
    //console.log(allGames);
    return allGames;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports.fetchGamesForDates = fetchGamesForDates;
