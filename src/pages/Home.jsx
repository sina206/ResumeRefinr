import { useState } from "react";
import Button from "@mui/material/Button";
import "../pages/Home.scss";
import OpenAI from "openai";
import ReviewDisplay from "../components/ReviewDisplay";

function Home() {
  const [cvFile, setCvFile] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [data, setData] = useState({}); // Initial state is an empty object

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_SECRET,
    dangerouslyAllowBrowser: true,
  });

  const fetchReview = async (data) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an assistant giving feedback on a tech CV/resume. Give your response in this JSON format: overall impression, grammar, formatting e.g. layout, content, bullet points that could be rephrased to be more impactful, and areas of improvement. Keep the responses short and concise. Keep each response to a maximum of 200 characters. There should be keys and values your response CRITICALLY MUST BE IN A FORMAT THAT CAN BE PARSED USING json.stringify in JAVASCRIPT. Wherever you think there could be improvements, you MUST mention the ALL OFs improvements. BE VERY CRITICAL",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: data,
                },
              },
            ],
          },
        ],
        model: "gpt-4-turbo",
      });
      // Assuming the API response contains the needed JSON structure in the first choice's message
      console.log(JSON.parse(completion.choices[0].message.content));
      setData(JSON.parse(completion.choices[0].message.content));
    } catch (error) {
      console.error("Error fetching review:", error);
      setData({ error: "Failed to fetch review. Please try again." });
    }
  };

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
        // console.log(reader.result);
        fetchReview(reader.result);
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
        <Button
          href="/recruitermode"
          variant="contained"
          className="recruiter-button"
        >
          Recruiter Mode
        </Button>
      </div>
      <div className="content">
        <div className="cv-section">
          {cvUrl &&
            (cvFile.type === "application/pdf" ? (
              <iframe src={cvUrl} title="CV" className="cv-pdf" />
            ) : (
              <img src={cvUrl} alt="CV" className="cv-image" />
            ))}
          {!cvUrl && (
            <label htmlFor="cv-upload" className="cv-upload-label">
              Upload CV
              <input
                type="file"
                id="cv-upload"
                accept=".jpeg,.png,.jpg"
                onChange={handleFileUpload}
                className="cv-upload-input"
              />
            </label>
          )}
          {cvUrl && (
            <Button
              variant="contained"
              className="new-cv-button"
              onClick={handleNewCvUpload}
            >
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
              <div>
                {data.overall_impression ? (
                  <ReviewDisplay jsonString={JSON.stringify(data)} />
                ) : data.error ? (
                  <p>{data.error}</p>
                ) : (
                  <p>Upload CV to get a review!!!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
