import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/contact/*" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
