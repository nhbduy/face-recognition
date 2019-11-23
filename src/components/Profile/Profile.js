import React from 'react';

import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return (
    <div className='profile-modal'>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 w-80'>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='h3 w3 dib'
            alt='avatar'
          />
          <h1>Tom Cruise</h1>
          <h4>Images Submitted: 7</h4>
          <p>Member since: May</p>
          <hr />

          <label className='mt2 fw6' htmlFor='user-name'>
            Name
          </label>
          <input
            className='pa2 ba w-100 input-hover-black'
            placeholder='Name'
            type='text'
            name='user-name'
            id='name'
          />

          <label className='mt2 fw6' htmlFor='user-age'>
            Age
          </label>
          <input
            className='pa2 ba w-100 input-hover-black'
            placeholder='77'
            type='text'
            name='user-age'
            id='age'
          />

          <label className='mt2 fw6' htmlFor='user-pet'>
            Pet
          </label>
          <input
            className='pa2 ba w-100 input-hover-black'
            placeholder='dragon'
            type='text'
            name='user-pet'
            id='pet'
          />

          <div className='mt4 button-container'>
            <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
              Save
            </button>
            <button
              className='b pa2 grow pointer w-40 b--black-20'
              onClick={() => toggleModal()}>
              Cancel
            </button>
          </div>
        </main>
        <div className='modal-close' onClick={() => toggleModal()}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
