import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useLocation } from "react-router-dom"; // Import useLocation
import webgazer from "webgazer";
import HeatMap from "../components/HeatMap";

const Recruitermode = () => {
 const location = useLocation(); // Initialize useLocation
 const cvUrl = location.state?.cvUrl; // Access the cvUrl passed from Home
 const [eyeCoordinates, setEyeCoordinates] = useState([]);

 useEffect(() => { 

  const webgazerInstance =  webgazer.setRegression('ridge') /* currently must set regression and tracker */
  .setTracker('TFFacemesh')
  .begin();

    // // Turn off video
    // webgazerInstance.showVideoPreview(false) /* shows all video previews */
    //   .showPredictionPoints(false); /* shows a square every 100 milliseconds where current prediction is */

      // Enable smoothing
    webgazer.applyKalmanFilter(true); // Kalman Filter defaults to on.

    webgazer.setGazeListener((data, timeStamp) => {
      setEyeCoordinates(prevCoordinates => [...prevCoordinates, data]); // Update eyeCoordinates state
      console.log(data, timeStamp);
    })

    // Clean up function
    return () => {
      webgazer.clearGazeListener(); // Cleanup webgazer listener
    };
 }, []);

 return (
    <div>
      {eyeCoordinates.length > 0 &&
        eyeCoordinates.map((coordinates, index) => (
          <HeatMap
            key={index}
            x={coordinates ? coordinates.x : 0}
            y={coordinates ? coordinates.y : 0}
          />
        ))}
      {/* Render HeatMap with eye coordinates /}
      {cvUrl && <iframe src={cvUrl} title="CV" className="cv-pdf" />}
      {/ Display PDF if cvUrl is present */}
      Recruitermode
    </div>
 );
};

export default Recruitermode;