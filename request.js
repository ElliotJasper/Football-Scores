const date = require("./getdate");

const formatDateAPITest = "2023-09-20";
const formatDatePathTest = "Wednesday-20th-September";

// Leagues to get data from
const leaguesToUse = [
  "premier-league",
  //"championship",
  //"league-one",
  //"italian-serie-a",
  //"spanish-la-liga",
  //"german-bundesliga",
  //"french-ligue-one",
  //"europa-league",
];

// Import date formats for API and pathing of API
let formatDateAPI = date.formatDateAPI;
let formatDatePath = date.formatDatePath;

let requestURL = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${formatDateAPI}%2FstartDate%2F${formatDateAPI}%2FtodayDate%2F${formatDateAPI}%2Ftournament%2Ffull-priority-order%2Fversion%2F2.4.6?timeout=5`;

// Function to get data for different leagues and return relevant parts
const getGames = async (name) => {
  try {
    const data = await fetch(requestURL);
    const json = await data.json();

    let leagueRoute = json.payload[0].body.matchData;

    for (let league of leagueRoute) {
      if (league.tournamentMeta.tournamentSlug == name) {
        league = league.tournamentDatesWithEvents[formatDatePath][0].events;
        return league;
      }
    }

    // If league not found, throw custom error
    throw new Error(`League '${name}' not found`);
  } catch (error) {
    console.error(`Error getting data for ${name}: ${error.message}`);
    return [];
  }
};

// Loops through leagues and gets data, appends to array, then exports for DB
(async () => {
  let allGames = [];

  for (let team of leaguesToUse) {
    let data = await getGames(team);

    for (let league of data) {
      if (league == 0) continue;
      // Store the game data in an object, much simpler than BBC.
      let game = {
        date: formatDateAPI,
        league: league.tournamentName.full,
        startTime: league.startTimeInUKHHMM,
        homeNameAbbrv: league.homeTeam.name.abbreviation,
        homeNameFull: league.homeTeam.name.full,
        homeScore: league.homeTeam.scores.score,
        homeResult: league.homeTeam.eventOutcome,
        awayNameAbbrv: league.awayTeam.name.abbreviation,
        awayNameFull: league.awayTeam.name.full,
        awayScore: league.awayTeam.scores.score,
        awayResult: league.awayTeam.eventOutcome,
        venue: league.venue.name.full,
      };
      // Push the game to the array
      allGames.push(game);
    }
  }
  console.log(allGames);
  // Export the array
  module.exports.allGames = "test";
})();
