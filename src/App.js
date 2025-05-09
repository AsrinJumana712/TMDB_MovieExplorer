import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MoviePage from "./Pages/MoviePage";
import { ContextProvider } from "./Context/Context";
import MovieDetails from "./Components/MovieDetails";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<h1>404 - Page not found.</h1>} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;