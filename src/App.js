// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./Components/TextSearch.jsx";

const App = () => (
    <Router basename="/ProgSecDev/text-search">
      <Routes>
      <Route path="/" element={<Search />} />
      </Routes>
    </Router>
  );

export default App;