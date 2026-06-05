// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";

const AppContent = () => {
  const location = useLocation();

  

  return (
    <>
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;