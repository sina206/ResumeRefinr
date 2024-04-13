import React, { useEffect } from "react";
import webgazer from "webgazer";

const Recruitermode = () => {
  useEffect(() => {
    window.saveDataAcrossSessions = true;

    // Webgazer script
    webgazer
      .setGazeListener((data, timeStamp) => {
        console.log(data, timeStamp);
      })
      .begin();

    // Clean up function if necessary
    return () => {
      // Clean up code here if needed
    };
  }, []); // Empty dependency array to run effect only once

  return <div>Recruitermode</div>;
};

export default Recruitermode;
