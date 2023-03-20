const leaguesToUse = [
  "premier-league",
  "championship",
  "league-one",
  "italian-serie-a",
  "spanish-la-liga",
  "german-bundesliga",
  "french-ligue-one",
];

let getLeague = async (id) => {
  const data = await await fetch(
    `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-sport-tables-data%2Fcompetition%2F${id}%2Fsport%2Ffootball%2Fversion%2F2.0.7?timeout=5`
  );
  const json = await data.json();
  return json;
};

(async () => {
  const allLeagues = [];

  // Loop throught array of leagues and fetch the data
  for (let i = 0; i < leaguesToUse.length; i++) {
    data = await getLeague(leaguesToUse[i]);
    const leagueName = data.payload[0].body.sportTables.title;
    const league = { leagueName: leagueName };
    const tableRoute = data.payload[0].body.sportTables.tables[0].rows;

    const leagueArray = [];

    // Loop through all the teams in the league and append data to object
    for (let i = 0; i < tableRoute.length; i++) {
      const teamPath = tableRoute[i].cells;
      let teamName;

      if (teamPath[2].td.abbrLink) {
        teamName = teamPath[2].td.abbrLink.abbr;
      } else {
        teamName = teamPath[2].td.abbr;
      }

      const individualTeam = {
        teamName: teamName,
        position: teamPath[0].td.text,
        points: teamPath[10].td.text,
        goalDifference: teamPath[9].td.text,
        gamesPlayed: teamPath[3].td.text,
        gamesWon: teamPath[4].td.text,
        gamesDrawn: teamPath[5].td.text,
        gamesLost: teamPath[6].td.text,
        teamMoved: teamPath[1].td.text,
      };

      leagueArray.push(individualTeam);

      // Add the single team to an object containing all the teams
    }

    league.table = leagueArray;
    // Push the league to an array containing all the leagues
    allLeagues.push(league);
  }
  console.log(allLeagues);
  module.exports.allLeagues = allLeagues;
})();

/*

allLeagues = [
  {leagueName: prem,
  table: [

  ]}
]

*/
