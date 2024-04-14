import { useState } from "react";
import Button from "@mui/material/Button";

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
      <div className="bg-purple-600 py-4 px-8 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Resume Refiner</h1>
        <Button
          variant="contained"
          className="bg-white text-purple-600 hover:bg-purple-500 hover:text-white"
        >
          Recruiter Mode
        </Button>
      </div>
      <div className="flex justify-center items-start min-h-screen">
        <div className="w-1/2 p-4 flex justify-center items-center">
          {cvUrl &&
            (cvFile.type === "application/pdf" ? (
              <iframe src={cvUrl} title="CV" className="w-full h-auto" />
            ) : (
              <img src={cvUrl} alt="CV" className="w-full h-auto" />
            ))}
          {!cvUrl && (
            <label
              htmlFor="cv-upload"
              className="bg-white text-purple-600 py-2 px-4 rounded-md cursor-pointer"
            >
              Upload CV
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
          {cvUrl && (
            <Button
              variant="contained"
              className="bg-purple-600 text-white hover:bg-purple-500"
              onClick={handleNewCvUpload}
            >
              Upload New CV
            </Button>
          )}
        </div>
        {cvUrl && (
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CV Stats</h2>
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-600">
                  Total Experience
                </p>
                <p className="text-lg font-bold text-gray-800">5 years</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-600">Skills</p>
                <ul className="list-disc list-inside">
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
