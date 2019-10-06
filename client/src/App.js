import React, { useState, useEffect } from 'react';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import { SIGN_UP, SIGN_IN, SIGN_OUT, HOME } from './route';

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: 'd7dcd0f9a66d407597e4780e5e2f3f3d'
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState(SIGN_IN);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const calculateFaceLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height
    };
  };

  const displayFaceBox = box => {
    setBox(box);
  };

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        input
      )
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(error => console.log(error));
  };

  const onRouteChange = data => {
    if (data === SIGN_OUT) setIsSignedIn(false);
    else if (data === HOME) setIsSignedIn(true);
    setRoute(data);
  };

  const renderContentDOM = () => {
    if (route === HOME)
      return (
        <React.Fragment>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </React.Fragment>
      );
    else if (route === SIGN_IN || route === SIGN_OUT)
      return <SignIn onRouteChange={onRouteChange} />;
    else if (route === SIGN_UP) return <SignUp onRouteChange={onRouteChange} />;
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particleOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {renderContentDOM()}
    </div>
  );
}

export default App;
