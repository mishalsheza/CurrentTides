import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";

const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_API;

  return (
    <div>
      <BrowserRouter>
        {/* Sticky Navbar with better spacing */}
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />} />
            <Route exact path="/home" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />} />
            <Route exact path="/general" element={<News key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
