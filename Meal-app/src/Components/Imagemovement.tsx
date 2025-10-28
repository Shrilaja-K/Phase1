import React, { Component } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default class Imagemovement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],  
      currentIndex: 0,
    };
  }

  
componentDidMount() {
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(res => res.json())
    .then(data => {
      this.setState({ meals: data.meals });
    
      this.autoSlide = setInterval(() => {
        this.handleNext();
      }, 2000); 
    });
}

componentWillUnmount() {
  clearInterval(this.autoSlide);
}


  handlePrev = () => {
    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex === 0
          ? prevState.meals.length - 1
          : prevState.currentIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState(prevState => ({
      currentIndex:
        prevState.currentIndex === prevState.meals.length - 1
          ? 0
          : prevState.currentIndex + 1,
    }));
  };

  render() {
    const { meals, currentIndex } = this.state;

    if (!meals.length) return <Typography>Loading...</Typography>;

    const meal = meals[currentIndex];

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          pb:10,
          height:'50%',
        }}
      >
        <IconButton onClick={this.handlePrev} aria-label="previous">
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            mx: 2,
            p: 2,
            borderRadius: '8px',
            bgcolor: '#D4DE95', 
            width:'100%'    
            
          }}
        >
          <Box sx={{ flex: '0 0 40%' }}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: '100%',borderRadius: '8px' ,objectFit:'cover' ,height:'100%'}}
            />
          </Box>

          <Box sx={{ flex: '1 1 60%' }}>
            <Typography variant="h5" sx={{ marginLeft:'50px',fontWeight: 600, mb: 1 }}>
              {meal.strMeal}
            </Typography>
            <Typography sx={{marginLeft:'50px'}}>
                 {meal.strMeal}!
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={this.handleNext} aria-label="next">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    );
  }
}
