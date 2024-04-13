import { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Button variant="contained">Recruiter Mode</Button>
      </div>
        
    </>
  );
}

export default Home;
