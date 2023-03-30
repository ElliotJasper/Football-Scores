import { useEffect, useState } from "react";
import liverpool from "../assets/liverpool.ico";
import mancity from "../assets/manchester-city.png";
import chelsea from "../assets/chelsea.png";
import west_ham from "../assets/west-ham.png";

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
      <div className="score-container">
        <div className="scores-display">
          <div className="team-1-display">
            <img className="team-image" src={liverpool} alt="liverpool" />
            <h3 className="team-name-display">Liverpool</h3>
          </div>
          <div className="current-score-display">
            <h2>2-0</h2>
          </div>
          <div className="team-2-display">
            <img className="team-image" src={mancity} alt="man city" />
            <h3 className="team-name-display">Man City</h3>
          </div>
        </div>
        <div className="scores-display">
          <div className="team-1-display">
            <img className="team-image" src={chelsea} alt="chelsea" />
            <h3 className="team-name-display">Chelsesa</h3>
          </div>
          <div className="current-score-display">
            <h2>3-2</h2>
          </div>
          <div className="team-2-display">
            <img className="team-image" src={west_ham} alt="west ham" />
            <h3 className="team-name-display">West Ham</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Window;
