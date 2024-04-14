import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "../pages/Home.scss";

function Home() {
  const [headerText, setHeaderText] = useState("");
  const [paragraphText, setParagraphText] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    // Set the header text with a typewriter effect
    const headerText =
      "Enhance Your Resume with Eye Tracking and AI Suggestion Tools";
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= headerText.length) {
        setHeaderText(headerText.substring(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 40);
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Set the paragraph text with a typewriter effect
    const paragraphText =
      "Make informed decisions about your resume layout and content by understanding where recruiters focus their attention.";
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= paragraphText.length) {
        setParagraphText(paragraphText.substring(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
      {/* Header Section */}
      <div className="bg-gradient-to-b from-black to-blue-900 w-full py-4">
        <header className="flex items-center h-16 px-4 md:px-6 w-full shrink-0">
          <p
            className="text-gray-300 mr-4 flex items-center text-lg font-bold tracking-tighter sm:tracking-tight"
            href="#"
          >
            ResumeRefinr
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-950/50"
              href="#"
            >
              Recruiter Mode
            </button>
          </div>
        </header>

        {/* Main Content Section */}
        <div className="container flex flex-col gap-4 px-4 py-10 items-center justify-center space-y-4 text-center md:gap-8 md:px-6 lg:gap-10 xl:gap-12">
          <div className="space-y-3">
            <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              {headerText}
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-400 md:text-3xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed dark:text-gray-400 py-8">
              {paragraphText}
            </p>
          </div>
          <div className="space-x-4">
            {cvUrl &&
              (cvFile.type === "application/pdf" ? (
                <iframe src={cvUrl} title="CV" className="w-full h-auto" />
              ) : (
                <img src={cvUrl} alt="CV" className="w-full h-auto" />
              ))}
            {!cvUrl && (
              <label
                htmlFor="cv-upload"
                className="inline-flex h-4 items-center justify-center rounded-md border border-gray-200 bg-white px-10 py-6 text-md font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
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
                className="inline-flex h-4 items-center justify-center rounded-md border border-gray-200 bg-white px-10 py-6 text-sm font-medium shadow-sm gap-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                onClick={handleNewCvUpload}
              >
                Upload New CV
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-center items-start min-h-screen">
          {/* CV Stats Section */}
          {cvUrl && (
            <div className="w-1/2 p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                CV Stats
              </h2>
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
      </div>
    </>
  );
}

export default Home;
