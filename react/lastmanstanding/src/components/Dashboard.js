import { useEffect, useState } from "react";

const Dashboard = () => {
  const [key, setKey] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const email = getCookie("email");
    const loggedIn = getCookie("logged_in") || false;

    const getSubscriptionInfo = async () => {
      fetch("/sub-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => response.json())
        .then((data) => setKey(data));
    };

    if (!loggedIn) {
      window.location.href = "/";
    } else {
      getSubscriptionInfo();
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
