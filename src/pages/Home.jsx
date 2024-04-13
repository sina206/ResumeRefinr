import { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-8xl font-bold text-center text-blue-500">
          Hello, Tailwind!
        </h1>

        <Button href="/recruitermode" variant="contained">
          Recruiter Mode
        </Button>
      </div>
    </>
  );
}

export default Home;
