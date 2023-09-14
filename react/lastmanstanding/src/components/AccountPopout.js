const AccountPopout = () => {
  return (
    <div className="popout-container">
      <div className="popout">
        <ul className="account-list">
          <li>Settings</li>
          <form action="/create-portal-session" method="post">
            <li>
              <button id="account-button" type="submit">
                Manage Subscriptions
              </button>
            </li>
          </form>
          <li>Signout</li>
        </ul>
      </div>
    </div>
  );
};

export default AccountPopout;
