import React, { useState } from 'react';

import { SIGN_IN, HOME } from '../../route';

const SignUp = ({ loadUser, onRouteChange }) => {
  const [signUpName, setSignUpName] = useState(null);
  const [signUpEmail, setSignUpEmail] = useState(null);
  const [signUpPassword, setSignUpPassword] = useState(null);
  const [okToRegister, setOkToRegister] = useState(false);

  const onNameChange = event => {
    setSignUpName(event.target.value);
  };

  const onEmailChange = event => {
    setSignUpEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setSignUpPassword(event.target.value);
  };

  const onRetypePasswordChange = event => {
    if (event.target.value !== signUpPassword) {
      console.log('match');
      setOkToRegister(true);
    }
  };

  const onSubmitSignUp = () => {
    if (!signUpName || !signUpEmail || !signUpPassword || !okToRegister) {
      alert('cannot register!!!');
      return;
    }

    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          loadUser(user);
          onRouteChange(HOME);
        }
      });
  };

  return (
    <React.Fragment>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign Up</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='name'>
                  Name
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='name'
                  id='name'
                  onChange={onNameChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={onEmailChange}
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
                  onChange={onPasswordChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='retype-password'>
                  Re-type Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='retype-password'
                  id='retype-password'
                  onChange={onRetypePasswordChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Register'
                onClick={() => onSubmitSignUp()}
              />
            </div>
            <div className='lh-copy mt3'>
              {'Already have an account?'}
              <p
                className='f6 link dim black db underline pointer'
                onClick={() => onRouteChange(SIGN_IN)}>
                Sign in
              </p>
            </div>
          </div>
        </main>
      </article>
    </React.Fragment>
  );
};

export default SignUp;
