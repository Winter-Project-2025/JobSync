import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const changeVal = () => {
    localStorage.setItem("server", "true");
  };

  useEffect(() => {
    changeVal();
  }, []);
  return (
    <div>
      <h1>Welcome to JobSync</h1>
      <h2>
        It makes your work of filling job forms <strong>EASY</strong>
      </h2>
      <Link
        to="/register"
        className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
      >
        Login
      </Link>
    </div>
  );
}

export default Home;
