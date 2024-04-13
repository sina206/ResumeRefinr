import React from 'react';

const HeatMap = ({ x, y }) => {
  const circleStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%', // Makes it a circle
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // More transparent red
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
  };

  return <div style={circleStyle}></div>;
};

export default HeatMap;

