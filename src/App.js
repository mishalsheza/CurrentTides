import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/* NavBar should be placed outside of <Routes> */}
          <NavBar />
          <Routes>
            {/* Define all routes */}
            <Route exact path="/" element={<News key="general" pageSize={6} country="in" category="general" />} />

            <Route exact path="/general" element={<News key="general" pageSize={6} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={6} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize={6} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={6} country="in" category="science" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
