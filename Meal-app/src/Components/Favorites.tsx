import React, { Component } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';

interface FavoritesProps {
  loggedIn: boolean;
  username: string;
  favoriteMeals: any[];
  onRemoveMeal: (idMeal: string) => void;
}

class Favorites extends Component<FavoritesProps> {
  render() {
    const { favoriteMeals, loggedIn, onRemoveMeal } = this.props;

    if (!loggedIn) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Please log in to view your favorites.</Typography>
        </Box>
      );
    }

    if (favoriteMeals.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">No favorite meals yet. Add some from the meal list!</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          My Favorites
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {favoriteMeals.map((meal) => (
            <Grid key={meal.idMeal} item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  component="img"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500, mb: 1 }}>{meal.strMeal}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => onRemoveMeal(meal.idMeal)}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default Favorites;
