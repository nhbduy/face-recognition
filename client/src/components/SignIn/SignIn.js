import React from 'react';

import { SIGN_UP, HOME } from '../../route';

const SignIn = ({ onRouteChange }) => {
  return (
    <React.Fragment>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
              {/* <label className='pa0 ma0 lh-copy f6 pointer'>
                <input type='checkbox' /> Remember me
              </label> */}
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
                onClick={() => onRouteChange(HOME)}
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                className='f6 link dim black db underline pointer'
                onClick={() => onRouteChange(SIGN_UP)}>
                Sign up
              </p>
              {/* <p className='f6 link dim black db'>
                Forgot your password?
              </p> */}
            </div>
          </div>
        </main>
      </article>
    </React.Fragment>
  );
};

export default SignIn;
