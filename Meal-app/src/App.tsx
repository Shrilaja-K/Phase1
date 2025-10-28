import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbardiv from './Components/Appbardiv';
import Imagemovement from './Components/Imagemovement';
import VideoSection from './Components/Videosection';
import TrendingMeals from './Components/Trendingmeals';
import Login from './Components/Login';
import Categories from './Components/Categories';

class App extends Component {
  render() {
    return (
      <Router>
        <Appbardiv />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VideoSection />
                <Imagemovement />
                <TrendingMeals />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
