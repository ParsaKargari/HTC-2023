import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
/*import {} from "./containers";*/

/*import {} from "./components"; */
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
