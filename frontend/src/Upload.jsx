import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    axios
      .post("http://localhost:3001/upload", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const signOut = (e) => {
    localStorage.setItem("user", "false");
    window.location.href = "/";
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSubmit} id="submit">
        Submit
      </button>
      <br />
      <button onClick={signOut} id="signout">
        Sign Out
      </button>
    </div>
  );
}

export default Upload;
