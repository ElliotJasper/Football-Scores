import { useState, useEffect } from "react";

const Tables = () => {
  const [engTeam, setEngTeam] = useState([]);
  const [espTeam, setEspTeam] = useState([]);
  const [gerTeam, setGerTeam] = useState([]);

  useEffect(() => {
    const fetchEng = async () => {
      const response = await fetch("/api/v1/football/eng");
      const data = await response.json();
      setEngTeam(data);
    };
    const fetchEsp = async () => {
      const response = await fetch("/api/v1/football/esp");
      const data = await response.json();
      setEspTeam(data);
    };
    const fetchGer = async () => {
      const response = await fetch("/api/v1/football/ger");
      const data = await response.json();
      setGerTeam(data);
    };

    fetchEng();
    fetchEsp();
    fetchGer();
  }, []);

  return (
    <div className="tables-container">
      <div className="tables-header">Current League Tables Sample</div>
      <div className="all-tables-container">
        <div className="single-table">
          <div className="teams-container">
            <p id="team-title">Team</p>
            {engTeam.map((team, index) => (
              <div key={index} className="team-each">
                <span className="inline-pos">{team.position}</span>
                <span className="inline-name">{team.teamName}</span>
              </div>
            ))}
          </div>
          <div className="played">
            <p id="played-title">P</p>
            {engTeam.map((team, index) => (
              <div key={index} className="played-each">
                {team.gamesPlayed}
              </div>
            ))}
          </div>
          <div className="goal-difference">
            <p id="gd-title">GD</p>
            {engTeam.map((team, index) => (
              <div key={index} className="gd-each">
                {team.goalDifference}
              </div>
            ))}
          </div>
          <div className="points">
            <p id="points-title">Pts</p>
            {engTeam.map((team, index) => (
              <div key={index} className="points-each">
                {team.points}
              </div>
            ))}
          </div>
        </div>
        <div className="single-table">
          <div className="teams-container">
            <p id="team-title">Team</p>
            {espTeam.map((team, index) => (
              <div key={index} className="team-each">
                <span className="inline-pos">{team.position}</span>
                <span className="inline-name">{team.teamName}</span>
              </div>
            ))}
          </div>
          <div className="played">
            <p id="played-title">P</p>
            {espTeam.map((team, index) => (
              <div key={index} className="played-each">
                {team.gamesPlayed}
              </div>
            ))}
          </div>
          <div className="goal-difference">
            <p id="gd-title">GD</p>
            {espTeam.map((team, index) => (
              <div key={index} className="gd-each">
                {team.goalDifference}
              </div>
            ))}
          </div>
          <div className="points">
            <p id="points-title">Pts</p>
            {espTeam.map((team, index) => (
              <div key={index} className="points-each">
                {team.points}
              </div>
            ))}
          </div>
        </div>
        <div className="single-table">
          <div className="teams-container">
            <p id="team-title">Team</p>
            {gerTeam.map((team, index) => (
              <div key={index} className="team-each">
                <span className="inline-pos">{team.position}</span>
                <span className="inline-name">{team.teamName}</span>
              </div>
            ))}
          </div>
          <div className="played">
            <p id="played-title">P</p>
            {gerTeam.map((team, index) => (
              <div key={index} className="played-each">
                {team.gamesPlayed}
              </div>
            ))}
          </div>
          <div className="goal-difference">
            <p id="gd-title">GD</p>
            {gerTeam.map((team, index) => (
              <div key={index} className="gd-each">
                {team.goalDifference}
              </div>
            ))}
          </div>
          <div className="points">
            <p id="points-title">Pts</p>
            {gerTeam.map((team, index) => (
              <div key={index} className="points-each">
                {team.points}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tables;
