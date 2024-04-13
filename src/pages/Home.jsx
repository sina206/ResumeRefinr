import { useState } from "react";
import Button from "@mui/material/Button";
import "../pages/Home.scss";

function Home() {
  const [cvFile, setCvFile] = useState(null);
  const [cvUrl, setCvUrl] = useState("");

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCvFile(file);
    // Display the selected file on the screen
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setCvUrl(url);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setCvUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle uploading a new CV
  const handleNewCvUpload = () => {
    setCvFile(null);
    setCvUrl("");
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Resume Refiner</h1>
        <Button variant="contained" className="recruiter-button">Recruiter Mode</Button>
      </div>
      <div className="content">
        <div className="cv-section">
          {cvUrl && (
            cvFile.type === "application/pdf" ? (
              <iframe src={cvUrl} title="CV" className="cv-pdf" />
            ) : (
              <img src={cvUrl} alt="CV" className="cv-image" />
            )
          )}
          {!cvUrl && (
            <label htmlFor="cv-upload" className="cv-upload-label">
              Upload CV
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="cv-upload-input"
              />
            </label>
          )}
          {cvUrl && (
            <Button variant="contained" className="new-cv-button" onClick={handleNewCvUpload}>
              Upload New CV
            </Button>
          )}
        </div>
        {cvUrl && (
          <div className="stats-section">
            <h2 className="stats-title">CV Stats</h2>
            <div className="stats-list">
              <div className="stats-item">
                <p className="stats-label">Total Experience</p>
                <p className="stats-value">5 years</p>
              </div>
              <div className="stats-item">
                <p className="stats-label">Skills</p>
                <ul className="skills-list">
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Node.js</li>
                </ul>
              </div>
              {/* Add more CV stats here */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
