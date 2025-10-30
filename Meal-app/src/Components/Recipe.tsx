import React, { Component } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  Toolbar,
  Paper,
  CircularProgress,
  IconButton,
} from '@mui/material';

import axios from 'axios';
import { withRouter } from './withRouter';
import MealCard from './MealCard';

interface RecipeState {
  meal: any | null;
  isLoading: boolean;
}

class Recipe extends Component<any, RecipeState> {
  state: RecipeState = {
    meal: null,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.params;
    if (id) this.fetchMeal(id);
  }

  componentDidUpdate(prevProps: any) {
    const prevId = prevProps.params.id;
    const currentId = this.props.params.id;

    if (prevId !== currentId) {
      this.fetchMeal(currentId);
    }
  }

  fetchMeal = async (id: string) => {
    this.setState({ isLoading: true });
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      this.setState({ meal: res.data.meals[0], isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ meal: null, isLoading: false });
    }
  };

  render() {
    const { meal, isLoading } = this.state;

    if (isLoading)
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.7)', 
            zIndex: 9999, 
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      );

    if (!meal)
      return (
        <Typography sx={{ mt: 10, textAlign: 'center' }}>
          Recipe not found.
        </Typography>
      );

    return (
      <Box
        sx={{
          mt: 10,
          p: 2,
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#D4DE95',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Toolbar />

        <Typography
          variant="h4"
          sx={{
            mb: 1,
            textAlign: 'center',
            color: '#3D4127',
            position: 'relative',
          }}
        >
          {meal.strMeal}
        </Typography>

        <CardMedia
          component="img"
          image={meal.strMealThumb}
          alt={meal.strMeal}
          sx={{
            maxWidth: '90%',
            width: { xs: '100%', sm: '80%', md: 500 },
            height: { xs: 'auto', md: 300 },
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: 3,
            mb: 3,
          }}
        />

        <Paper
          elevation={3}
          sx={{
            p: 3,
            maxWidth: 800,
            width: { xs: '95%', sm: '90%', md: 800 },
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': { boxShadow: 8, transform: 'scale(1.02)' },
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Instructions
          </Typography>
          <Typography sx={{ color: '#3D4127', lineHeight: 1.6 }}>
            {meal.strInstructions}
          </Typography>
        </Paper>
      </Box>
    );
  }
}

export default withRouter(Recipe);
