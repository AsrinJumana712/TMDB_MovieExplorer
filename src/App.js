import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="*" element={<h1>404 - Page not found.</h1>} />
      </Routes>
    </Router>
  );
}

export default App;