const requestURL = 'https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-sport-tables-data%2Fcompetition%2Fpremier-league%2Fsport%2Ffootball%2Fversion%2F2.0.7?timeout=5';

fetch(requestURL)
    .then(res => res.json())
    .then (data => {
        const leagueName = data.payload[0].body.sportTables.title
        const league = {leagueName : leagueName};
        console.log(leagueName);
        const tableRoute = data.payload[0].body.sportTables.tables[0].rows;
        for (let i =0; i < tableRoute.length; i++) {
            const teamPath = tableRoute[i].cells;
            const individualTeam = {
                teamName: teamPath[2].td.abbrLink.abbr,
                points: teamPath[10].td.text,
                gamesPlayed: teamPath[3].td.text,
                gamesWon : teamPath[4].td.text,
                gamesDrawn: teamPath[5].td.text,
                gamesLost : teamPath[6].td.text,
                teamMoved : teamPath[1].td.text
            }
            league[i + 1] = individualTeam;
        }
        console.log(league);
        module.exports.league = league;
    }
);


