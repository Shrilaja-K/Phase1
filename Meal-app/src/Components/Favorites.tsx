import React, { Component } from 'react';
import { Box, Grid, Paper, Typography, IconButton, Toolbar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { withRouter } from './withRouter';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  navigate: (path: string) => void;
  favorites: Meal[];
  removeFavorite: (id: string) => void;
  loggedIn: boolean;
}

class Favorites extends Component<Props> {
  handleMealClick = (id: string) => {
    this.props.navigate(`/recipe/${id}`);
  };

  handleRemoveFavorite = (id: string) => {
    this.props.removeFavorite(id);
  };

  render() {
    const { favorites } = this.props;

    if (!favorites.length) {
      return (
        <Box
          sx={{
            backgroundColor: '#D4DE95',
            minHeight: '100vh',
            width: '100vw',
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" textAlign="center">
            No favorites yet!
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          backgroundColor: '#D4DE95',
          minHeight: '100vh',
          width: '100vw',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 3,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('/b3.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3,


          }}
        />
        <Toolbar />
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, mt: 10 }}>
          My Favorites
        </Typography>

        <Grid container spacing={3} sx={{ width: { xs: '95%', sm: '90%', md: '80%' }, justifyContent: 'center', p: 2 }}>
          {favorites.map((meal) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={meal.idMeal} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                onClick={() => this.handleMealClick(meal.idMeal)}
                sx={{
                  width: 250,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 2,
                  '&:hover img': { transform: 'scale(1.05)' },
                  transition: '0.3s',
                  position: 'relative',
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: '100%', height: 180, objectFit: 'cover', transition: 'transform 0.3s' }}
                />
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle1" textAlign="center">
                    {meal.strMeal}
                  </Typography>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    this.handleRemoveFavorite(meal.idMeal);
                  }}
                  sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.7)' }}
                >
                  <FavoriteIcon color="error" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default withRouter(Favorites);
