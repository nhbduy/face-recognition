import React from 'react';

import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imageUrl }) => {
  const boxStyles = boxes.map(box => {
    const { leftCol = 0, topRow = 0, rightCol = 0, bottomRow = 0 } = box;
    return {
      top: topRow,
      right: rightCol,
      bottom: bottomRow,
      left: leftCol
    };
  });

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputImage'
          src={imageUrl}
          alt=''
          width='500px'
          height='auto'
        />
        {boxStyles.map(boxStyle => (
          <div
            key={boxStyle.top}
            className='bounding-box'
            style={boxStyle}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
