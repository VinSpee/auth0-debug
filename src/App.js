import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Auth from './auth';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Auth>
          {({
            authenticated,
          }) => (
            authenticated ? (
              <Redirect replace to="/list" />
            ) : (
              <Redirect replace to="/login" />
            )
          )}
        </Auth>
      </div>
    );
  }
}

export default App;
