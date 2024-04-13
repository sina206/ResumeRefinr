import React, { useEffect, useState } from "react";;
import webgazer from "webgazer";;
import HeatMap from '../components/HeatMap';

const Recruitermode = () => {
  const [eyeCoordinates, setEyeCoordinates] = useState([]);

  useEffect(() => { 
    webgazer.setGazeListener((data, timeStamp) => {
      setEyeCoordinates(prevCoordinates => [...prevCoordinates, data]); // Update eyeCoordinates state
      console.log(data, timeStamp);
    }).begin();

    // Clean up function
    return () => {
      webgazer.clearGazeListener(); // Cleanup webgazer listener
    };
  }, []);

  return (
    <div>
      {eyeCoordinates.length > 0 && eyeCoordinates.map((coordinates, index) => (
        <HeatMap key={index} x={coordinates ? coordinates.x : 0} y={coordinates ? coordinates.y : 0} />
      ))}
      {/* Render HeatMap with eye coordinates */}
      Recruitermode
    </div>
  );
};

export default Recruitermode;
