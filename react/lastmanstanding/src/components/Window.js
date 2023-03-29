import { useEffect, useState } from "react";
import liverpool from "../assets/liverpool.ico";
import mancity from "../assets/mancity.png";

const Window = () => {
  const [teamName, setTeamName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/football/test");
      const data = await response.json();
      setTeamName(data);
    };
    fetchData();
  }, []);

  return (
    <div className="window-container">
      <div className="league-container">
        <div className="teams-container">
          <p id="team-title">Team</p>
          {teamName.map((team, index) => (
            <div key={index} className="team-each">
              <span className="inline-pos">{team.position}</span>
              <span className="inline-name">{team.teamName}</span>
            </div>
          ))}
        </div>
        <div className="played">
          <p id="played-title">P</p>
          {teamName.map((team, index) => (
            <div key={index} className="played-each">
              {team.gamesPlayed}
            </div>
          ))}
        </div>
        <div className="goal-difference">
          <p id="gd-title">GD</p>
          {teamName.map((team, index) => (
            <div key={index} className="gd-each">
              {team.goalDifference}
            </div>
          ))}
        </div>
        <div className="points">
          <p id="points-title">Pts</p>
          {teamName.map((team, index) => (
            <div key={index} className="points-each">
              {team.points}
            </div>
          ))}
        </div>
      </div>
      <div className="score-container"></div>
    </div>
  );
};

export default Window;
