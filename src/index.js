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
      basename={process.env.production ? '/auth0-test' : '/'}
    >
      <div>
        <div style={{ background: 'cyan' }}>
          <Auth>
            {({
              profile,
              authInstance
            }) => (
              <div>
                profile:
                {JSON.stringify(profile)}
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
