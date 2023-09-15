const AccountPopout = () => {
  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="popout-container">
      <div className="popout">
        <ul className="account-list">
          <li>Settings</li>
          <form action="/create-portal-session" method="post">
            <li>
              <button className="account-button" type="submit">
                Manage Subscriptions
              </button>
            </li>
          </form>
          <form action="/sign-out" method="post">
            <li>
              <button type="submit" className="account-button" onClick={logout}>
                Sign Out
              </button>
            </li>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default AccountPopout;
