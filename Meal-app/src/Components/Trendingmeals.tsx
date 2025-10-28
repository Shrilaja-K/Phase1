import React, { Component } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from '@mui/material';

export default class TrendingMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      currentPage: 1,
      itemsPerPage: 4,
    };
  }

  componentDidMount() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
      .then((res) => res.json())
      .then((data) => this.setState({ meals: data.meals || [] }))
      .catch((err) => console.error('Error fetching meals:', err));
  }

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { meals, currentPage, itemsPerPage } = this.state;

    if (!meals.length) return <Typography>Loading trending meals...</Typography>;

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

    const totalPages = Math.ceil(meals.length / itemsPerPage);

    return (
      <Box >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Trending Meals
        </Typography>

        <Grid container spacing={3}>
          {currentMeals.map((meal) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={meal.idMeal}
              sx={{ display: 'flex' }} 
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%', 
                  height: '100%', 
                }}
              >
                <CardMedia
                  component="img"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                  sx={{
                    height: 140,
                    objectFit: 'cover',
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      overflow: 'hidden',
                    }}
                  >
                    {meal.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={this.handlePageChange}
            color='#32361aff'
          />
        </Box>
      </Box>
    );
  }
}
