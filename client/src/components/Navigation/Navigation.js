import React from 'react';

import './Navigation.css';

import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../../route';

const Navigation = ({ isSignedIn, onRouteChange }) => {
  const homeNav = (
    <nav>
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange(SIGN_OUT)}>
        Sign Out
      </p>
    </nav>
  );

  const indexNav = (
    <React.Fragment>
      <nav>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange(SIGN_IN)}>
          Sign In
        </p>
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => onRouteChange(SIGN_UP)}>
          Register
        </p>
      </nav>
    </React.Fragment>
  );

  return isSignedIn ? homeNav : indexNav;
};

export default Navigation;
