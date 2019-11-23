import React from 'react';

import ProfileIcon from '../Profile/ProfileIcon';

import './Navigation.css';

import { SIGN_UP, SIGN_IN } from '../../route';

const Navigation = ({ isSignedIn, onRouteChange, toggleModal }) => {
  const homeNav = (
    <nav>
      <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      {/* <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange(SIGN_OUT)}>
        Sign Out
      </p> */}
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
