import React, { useEffect, useState } from "react";
import webgazer from "webgazer";
import HeatMap from '../components/HeatMap';

const Recruitermode = () => {
  const [eyeCoordinates, setEyeCoordinates] = useState([]);

  useEffect(() => {
    webgazer.setGazeListener((data, timeStamp) => {
      if (data && data.x >= window.innerWidth / 4 && data.x <= (window.innerWidth * 3) / 4) {
        setEyeCoordinates(prevCoordinates => [...prevCoordinates, data]); // Update eyeCoordinates state
        console.log(data, timeStamp);
      }
    }).begin();

    // Clean up function
    return () => {
      webgazer.clearGazeListener(); // Cleanup webgazer listener
    };
  }, []);

  return (
    <div>
      {eyeCoordinates.length > 0 && eyeCoordinates.map((coordinates, index) => (
        <HeatMap key={index} x={coordinates.x} y={coordinates.y} />
      ))}
      <div>
        <img src="../src/assets/cv_image.png" alt="CV Image" />
      </div>
    </div>
  );
};

export default Recruitermode;
