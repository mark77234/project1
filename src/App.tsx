import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoadmapPage from "./components/RoadmapPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap/:careerId" element={<RoadmapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
