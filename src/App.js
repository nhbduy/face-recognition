import React, { useState } from 'react';

import Particles from 'react-particles-js';

import './App.css';

import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Profile from './components/Profile/Profile';

import Modal from './components/Modal/Modal';

import { HOME, SIGN_UP, SIGN_IN, SIGN_OUT } from './route';

import SERVER_URL from './config';

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const defaultUserData = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: '',
  age: '',
  pet: '',
};

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState(SIGN_IN);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(defaultUserData);

  const resetAllState = () => {
    setInput('');
    setImageUrl('');
    setBoxes([]);
    setRoute(SIGN_IN);
    setIsSignedIn(false);
    setUser(defaultUserData);
  };

  const loadUser = (data) => {
    const { id, name, email, entries, joined, age, pet } = data;
    setUser({
      id,
      name,
      email,
      entries,
      joined,
      age,
      pet,
    });
  };

  const calculateFacesLocation = (data) =>
    data.outputs[0].data.regions.map((region) => {
      const face = region.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

  const displayFaceBoxes = (box) => {
    setBoxes(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch(`${SERVER_URL}/imageUrl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`${SERVER_URL}/image`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => setUser({ ...user, entries: count }))
          .catch(console.error);

        displayFaceBoxes(calculateFacesLocation(data));
      })
      .catch((error) => console.error(error));
  };

  const onRouteChange = (data) => {
    if (data === SIGN_OUT) resetAllState();
    else if (data === HOME) setIsSignedIn(true);
    setRoute(data);
  };

  const toggleModal = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const renderContentDOM = () => {
    if (route === HOME) {
      return (
        <>
          <Logo />

          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </>
      );
    }
    if (route === SIGN_IN || route === SIGN_OUT)
      return <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />;
    if (route === SIGN_UP)
      return <SignUp loadUser={loadUser} onRouteChange={onRouteChange} />;
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particleOptions} />
      <Navigation
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
        toggleModal={toggleModal}
      />
      {isProfileOpen && (
        <Modal>
          <Profile
            user={user}
            loadUser={loadUser}
            isProfileOpen={isProfileOpen}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
      {renderContentDOM()}
    </div>
  );
}

export default App;
