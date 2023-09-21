const date = require("./getdate");

const formatDateAPITest = "2023-09-20";
const formatDatePathTest = "Wednesday-20th-September";

// Leagues to get data from
const leaguesToUse = [
  "premier-league",
  "championship",
  "league-one",
  "italian-serie-a",
  "spanish-la-liga",
  "german-bundesliga",
  "french-ligue-one",
  "europa-league",
  "us-major-league",
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
        league = league.tournamentDatesWithEvents[formatDatePath]; //[0].events;
        //console.log(league);
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
  // Loop through array of competitions to find matching ones
  for (let competition of leaguesToUse) {
    let data = await getGames(competition);

    // If it's a group competition, there will be multiple objects to loop, if not just [0]
    for (let league of data) {
      if (league == 0) continue;
      // Now loop through each group (or league) to get individual games
      for (singleGame of league.events) {
        let round;
        if (league.round.name != null) {
          round = league.round.name.first;
        } else {
          round = null;
        }
        let game = {
          date: formatDateAPI,
          league: singleGame.tournamentName.full,
          round: round,
          startTime: singleGame.startTimeInUKHHMM,
          homeNameAbbrv: singleGame.homeTeam.name.abbreviation,
          homeNameFull: singleGame.homeTeam.name.full,
          homeScore: singleGame.homeTeam.scores.score,
          homeResult: singleGame.homeTeam.eventOutcome,
          awayNameAbbrv: singleGame.awayTeam.name.abbreviation,
          awayNameFull: singleGame.awayTeam.name.full,
          awayScore: singleGame.awayTeam.scores.score,
          awayResult: singleGame.awayTeam.eventOutcome,
        };
        allGames.push(game);
      }
    }
  }
  console.log(allGames);

  //console.log(allGames);
  module.exports.allGames = allGames;
})();

// Look at BBC sports API in inspect element at https://www.bbc.co.uk/sport/football/scores-fixtures to see how API is laid out
