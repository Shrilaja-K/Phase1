import React, { Component } from 'react';
import { Box, Typography, IconButton, Paper, CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { withRouter } from './withRouter';
import MealCard from './MealCard';
import axios from 'axios'; 

class ImageMovement extends Component{
  state = {
    meals: [],
    currentIndex: 0,
  };

  componentDidMount() {
    this.fetchMeals(5);
  }

  componentWillUnmount() {
    clearInterval(this.autoSlide);
  }

  fetchMeals = async (count: number) => {
    const meals = [];
    for (let i = 0; i < count; i++) {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const data =  res.data;
      meals.push(data.meals[0]);
    }
    this.setState({ meals }, () => {
      this.autoSlide = setInterval(this.handleNext, 3000);
    });
  };

  handlePrev = () => {
    this.setState(prev => ({
      currentIndex: prev.currentIndex === 0 ? prev.meals.length - 1 : prev.currentIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState(prev => ({
      currentIndex: prev.currentIndex === prev.meals.length - 1 ? 0 : prev.currentIndex + 1,
    }));
  };

  handleClickMeal = (id: string) => {
    this.props.navigate(`/recipe/${id}`);
  };

  render() {
    const { meals, currentIndex } = this.state;

    if (!meals.length) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
          <CircularProgress />
        </Box>
      );
    }

    const meal = meals[currentIndex];

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '100%',
          width: '100%',
          mx: 'auto',
          pb: 5,
          overflowX: 'hidden',
          overflowY: 'hidden',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: { xs: 'auto', md: 500 },
        }}
      >
        <IconButton onClick={this.handlePrev}>
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          onClick={() => this.handleClickMeal(meal.idMeal)} 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexGrow: 1,
            mx: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: '#D4DE95',
            width: '100%',
            cursor: 'pointer',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: { xs: '0 0 100%', md: '0 0 40%' }, height: { xs: 250, md: '100%' }, mb: { xs: 2, md: 0 } }}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}
            />
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', px: { xs: 2, md: 3 }, width: '100%' }}>
            <Paper elevation={6} sx={{ p: { xs: 2, md: 3 }, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 3, maxWidth: 400, width: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, letterSpacing: 1, lineHeight: 1.4, fontSize: { xs: 18, md: 22 } }}>
                {meal.strMeal}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.6, color: '#333' }}>
                {meal.strInstructions?.slice(0, 150)}...
              </Typography>
            </Paper>
          </Box>
        </Box>

        <IconButton onClick={this.handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    );
  }
}

export default withRouter(ImageMovement);
