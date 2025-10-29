import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Appbardiv from './Components/Appbardiv';
import Imagemovement from './Components/Imagemovement';
import VideoSection from './Components/Videosection';
import TrendingMeals from './Components/Trendingmeals';
import Login from './Components/Login';
import Categories from './Components/Categories';
import SignUp from './Components/SignUp';
import Addrecipe from './Components/Addrecipe';
import Settings from './Components/Settings';
import Profile from './Components/Profile';
import Recipe from './Components/Recipe';
import Filter from './Components/Filter';
import ErrorBoundary from './Components/Errorboundary'; 
import Sweets from './Components/Sweets';

class App extends Component {
  render() {
    return (
      <Router>
        <Appbardiv />
       
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ width: '100%', overflowX: 'hidden',overflowY: 'hidden' }}>
                  <VideoSection />
                  <Imagemovement />
                  <TrendingMeals />
                  <Sweets/>
                </Box>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addrecipe" element={<Addrecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Routes>
        
      </Router>
    );
  }
}

export default App;
