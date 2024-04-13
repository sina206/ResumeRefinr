import { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

function Home() {
  const [count, setCount] = useState(0);
  const [processedResponse, setProcessedResponse] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/gpt-response", {
        prompt: "What's in this image?",
      });

      setProcessedResponse(response.data.processedResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <Button variant="contained">Recruiter Mode</Button>
        <p>{processedResponse}</p>
      </div>
    </>
  );
}

export default Home;
