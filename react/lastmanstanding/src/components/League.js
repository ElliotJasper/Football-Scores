import { useEffect, useState } from "react";

const League = () => {
  const [teamName, setTeamName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/v1/football/leagues");
      const body = await data.json();
      let allTeams = [];
      for (let i = 0; i < body.length; i++) {
        //console.log(body[i]);
        allTeams.push({
          ...body[i],
        });
      }
      console.log(allTeams);
      setTeamName(allTeams);
    };
    fetchData();
  }, []);

  return (
    <div className="leagues-container">
      <div className="teams-container">
        <p id="team-title">Team</p>
        {teamName.map((item, index) => (
          <div key={index} className="team-each">
            <span className="inline-pos">{item.position}</span>
            <span className="inline-name">{item.teamName}</span>
          </div>
        ))}
      </div>
      <div className="played">
        <p id="played-title">P</p>
        {teamName.map((item, index) => (
          <div key={index} className="played-each">
            {item.gamesPlayed}
          </div>
        ))}
      </div>
      <div className="goal-difference">
        <p id="gd-title">GD</p>
        {teamName.map((item, index) => (
          <div key={index} className="gd-each">
            {item.goalDifference}
          </div>
        ))}
      </div>
      <div className="points">
        <p id="points-title">Pts</p>
        {teamName.map((item, index) => (
          <div key={index} className="points-each">
            {item.points}
          </div>
        ))}
      </div>
    </div>
  );
};

export default League;
