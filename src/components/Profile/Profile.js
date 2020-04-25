import React, { useState } from 'react';

import './Profile.css';

import SERVER_URL from '../../config';

const Profile = ({ user, loadUser, isProfileOpen, toggleModal }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      case 'user-age':
        setAge(event.target.value);
        break;
      case 'user-pet':
        setPet(event.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = (data) => {
    fetch(`${SERVER_URL}/profile/${user.id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formInput: data,
      }),
    })
      .then((response) => {
        toggleModal();
        loadUser({ ...user, ...data });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='profile-modal'>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 w-80'>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='h3 w3 dib'
            alt='avatar'
          />
          <h1>{name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />

          <label className='mt2 fw6' htmlFor='user-name'>
            Name
          </label>
          <input
            className='pa2 ba w-100'
            placeholder={user.name}
            type='text'
            name='user-name'
            id='name'
            value={name}
            onChange={onFormChange}
          />

          <label className='mt2 fw6' htmlFor='user-age'>
            Age
          </label>
          <input
            className='pa2 ba w-100'
            placeholder={user.age}
            type='text'
            name='user-age'
            id='age'
            value={age}
            onChange={onFormChange}
          />

          <label className='mt2 fw6' htmlFor='user-pet'>
            Pet
          </label>
          <input
            className='pa2 ba w-100'
            placeholder={user.pet}
            type='text'
            name='user-pet'
            id='pet'
            value={pet}
            onChange={onFormChange}
          />

          <div className='mt4 button-container'>
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
              onClick={() => onProfileUpdate({ name, age, pet })}>
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
