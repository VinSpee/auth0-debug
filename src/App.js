import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Auth from './auth';

const App = () => (
  <div>
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

export default App;
