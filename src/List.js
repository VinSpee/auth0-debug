import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './auth';
import './App.css';

const List = () => (
  <div className="App">
    <Auth>
      {({
        authenticated,
        profile,
      }) => (
        authenticated ? (
          <div>
            List items for a logged in user would go here
          </div>
        ) : (
          <Redirect replace to="/login" />
        )
      )}
    </Auth>
  </div>
);

export default List;
