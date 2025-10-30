import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Appbardiv from './Components/Appbardiv';
import VideoSection from './Components/Videosection';
import Imagemovement from './Components/Imagemovement';
import TrendingMeals from './Components/Trendingmeals';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import ContactUs from './Components/ContactUs';
import Sweets from './Components/Sweets';
import Categories from './Components/Categories';

import Recipe from './Components/Recipe';
import Filter from './Components/Filter';
import ErrorBoundary from './Components/Errorboundary';
import Favorites from './Components/Favorites';
import { FavoritesProvider } from './Components/FavoritesContext';

class App extends Component {
  state = {
    loggedIn: false,
    username: '',
  };

  handleLogin = (username: string) => {
    this.setState({ loggedIn: true, username });
  };

  handleLogout = () => {
    this.setState({ loggedIn: false, username: '' });
  };

  render() {
    const { loggedIn, username } = this.state;

    return (
      <FavoritesProvider>
      <Router>
        <Appbardiv loggedIn={loggedIn} username={username} onLogout={this.handleLogout} />
         
        <Routes>
          <Route
            path="/"
            element={
              <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
                <VideoSection />
                <Imagemovement />
                <TrendingMeals />
                <Sweets />
                <ContactUs />
                <Footer />
              </Box>
            }
          />
          
          <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={this.handleLogin} />} />
          <Route path="/categories" element={<Categories />} />
          
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="*" element={<ErrorBoundary />} />
          

        </Routes>
      </Router>
      </FavoritesProvider>
    );
  }
}

export default App;
