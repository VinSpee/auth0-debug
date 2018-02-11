import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import List from './List';
import Auth from './auth';

ReactDOM.render(
  <div>
    <Router
      basename={process.env.PUBLIC_URL}
    >
      <div>
        <div style={{ background: 'cyan' }}>
          <Auth>
            {({
              profile,
              authInstance,
              logout,
            }) => (
              <div>
                profile:
                {JSON.stringify(profile)}
                <div>
                  <button onClick={logout}>
                    log out
                  </button>
                </div>
              </div>
            )}
          </Auth>
        </div>

        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/list" component={List} />
        </Switch>
      </div>
    </Router>
  </div>,
  document.getElementById('root')
);
