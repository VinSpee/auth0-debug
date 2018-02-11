import React from 'react';
import Auth from './auth';
import './App.css';

export default () => (
  <div className="App">
    <Auth>
      {({
        login,
        logout,
      }) => (
        <div>
          <button
            onClick={login}
          >
            Log In
          </button>
          <div>
            <button
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </Auth>
  </div>
);
