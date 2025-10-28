import React, { Component } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

export default class TrendingMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
    };
  }

  componentDidMount() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
    
      .then(res => res.json())
      .then(data => this.setState({ meals: data.meals.slice(0, 4) || [] })); 
  }

  render() {
    const { meals } = this.state;

    if (!meals.length) return <Typography>Loading trending meals...</Typography>;

    return (
      <Box >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Trending Meals
        </Typography>

        <Grid container spacing={3}>
          {meals.map(meal => (
            <Grid item xs={12} sm={6} md={3} key={meal.idMeal}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent>
                  <Typography variant="h6">{meal.strMeal}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}
