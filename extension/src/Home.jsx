import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get(function (result) {
      if (result.user === true) {
        navigate("/contact/*");
      }
    });
  }, []);

  const reDirect = () => {
    chrome.tabs.create({ url: "http://localhost:5173" });
  };
  return (
    <div>
      <div>Welcome to Home Page</div>
      <button onClick={reDirect}>Submit</button>
    </div>
  );
}

export default Home;
