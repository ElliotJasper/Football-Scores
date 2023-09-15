import { useEffect, useState } from "react";

const Dashboard = () => {
  const [key, setKey] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const loggedIn = localStorage.getItem("isSubscribed") || false;
    const apiKey = localStorage.getItem("apiKey");
    setKey(apiKey);

    if (!loggedIn) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="dashboard-main-container">
      <div className="dashboard">
        <div className="key">Your API Key: {key}</div>
      </div>
    </div>
  );
};

export default Dashboard;
