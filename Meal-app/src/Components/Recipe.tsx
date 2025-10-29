import React, { Component } from 'react';
import { Box, Typography, CardMedia, Toolbar, Paper } from '@mui/material';
import axios from 'axios';
import { withRouter } from './withRouter';

interface RecipeState {
  meal: any | null;
}

class Recipe extends Component<any, RecipeState> {
  state: RecipeState = {
    meal: null,
  };

  componentDidMount() {
    const { id } = this.props.params;
    if (id) this.fetchMeal(id);
  }

  fetchMeal = async (id: string) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      this.setState({ meal: res.data.meals[0] });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { meal } = this.state;

    if (!meal)
      return (
        <Typography sx={{ mt: 10, textAlign: 'center' }}>Loading...</Typography>
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
          overflowX:'hidden',
          boxSizing:'border-box'
        }}
      >
        <Toolbar />

        
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: 'center', color: '#3D4127' }}
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
          <Typography
            sx={{ color: '#3D4127', lineHeight: 1.6 }}
          >
            {meal.strInstructions}
          </Typography>
        </Paper>
      </Box>
    );
  }
}

export default withRouter(Recipe);
