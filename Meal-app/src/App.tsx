import React, { lazy,Suspense,Component } from 'react';
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
import ProtectedRoute from './Components/ProtectedRoute';
import Recipe from './Components/Recipe';
// import Filter from './Components/Filter';
import ErrorBoundary from './Components/Errorboundary';
import Favorites from './Components/Favorites';
import { connect } from 'react-redux';
import type { RootState } from './redux/store';

const Filter = lazy(() => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./Components/Filter'));
    },3000);
  })
);

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.auth.loggedIn,
  username: state.auth.username,
  email: state.auth.email,
});




interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface AppState {
  // loggedIn: boolean;
  username: string;
  email: string;
  favorites: Meal[];
}

class App extends Component<{}, AppState> {
  state: AppState = {
    // loggedIn: false,
    username: '',
    email: '',
    favorites: this.loadFavorites(),
  };

  loadFavorites(): Meal[] {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  }

  saveFavorites(favorites: Meal[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.setState({ favorites });
  }

  handleLogin = (username: string, email: string) => {
    this.setState({ loggedIn: true, username, email });
  };

  handleLogout = () => {
    this.setState({ loggedIn: false, username: '', email: '', favorites: [] });
    localStorage.removeItem('favorites');
  };

  addFavorite = (meal: Meal) => {
  this.setState((prev) => {
    if (!prev.favorites.find((m) => m.idMeal === meal.idMeal)) {
      const updated = [...prev.favorites, meal];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return { favorites: updated };
    }
    return prev; 
  });
};


  removeFavorite = (id: string) => {
    const updated = this.state.favorites.filter((meal) => meal.idMeal !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    this.setState({ favorites: updated });
  };

  render() {
    const { loggedIn, username, email, favorites } = this.state;

    return (
      <Router>
        <Appbardiv
  loggedIn={this.props.loggedIn}
  username={this.props.username}
  onLogout={this.handleLogout}
  favorites={favorites}
/>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
                <VideoSection />
                <Imagemovement />
                <TrendingMeals />
                <Sweets />
                <Box
                  sx={{
                    backgroundImage: `url('/bg.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    py: { xs: 4, md: 8 },
                  }}
                >
                  <ContactUs loggedIn={loggedIn} userEmail={email} />
                </Box>
                <Footer />
              </Box>
            }
          />

          <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={this.handleLogin} />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          
          <Route
  path="/filter"
  element={
    <Filter
      addFavorite={this.addFavorite}
      removeFavorite={this.removeFavorite}
      favorites={favorites}
      loggedIn={loggedIn}
    />
  }
/>
          

         
  <Route
    path="/favorites"
    element={
      <ProtectedRoute loggedIn={this.props.loggedIn}>
        <Favorites favorites={favorites} removeFavorite={this.removeFavorite} />
      </ProtectedRoute>
    }
  />

          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
        </Suspense>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);

// import React from 'react'
// import Hook from './Components/Hook'

// function App() {
//   return (
//     <div>
//       <Hook />
//     </div>
//   )
// }
// export default App

