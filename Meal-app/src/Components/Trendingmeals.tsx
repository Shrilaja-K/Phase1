import React, { Component } from 'react';
import { withRouter } from './withRouter';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Pagination,
} from '@mui/material';

class TrendingMeals extends Component {
  state = {
    meals: [],
    currentPage: 1,
    itemsPerPage: 3, 
    siblingCount: 1,
    boundaryCount: 1,
  };

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); 

    try {
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast'
      );
      const data = await res.json();
      this.setState({ meals: data.meals || [] });
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const width = window.innerWidth;

    if (width < 600) {
      this.setState({ siblingCount: 0, boundaryCount: 0, itemsPerPage: 1 });
    } else if (width < 900) {
      this.setState({ siblingCount: 1, boundaryCount: 1, itemsPerPage: 2 });
    } else {
      this.setState({ siblingCount: 1, boundaryCount: 1, itemsPerPage: 3 });
    }
  };

  handlePageChange = (event, value) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { meals, currentPage, itemsPerPage, siblingCount, boundaryCount } =
      this.state;

    if (!meals.length)
      return (
        <Typography textAlign="center" sx={{ mt: 4 }}>
          Loading trending meals...
        </Typography>
      );

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
    const totalPages = Math.ceil(meals.length / itemsPerPage);

    return (
      <Box sx={{ width: '100%', px: 2, py: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 4, textAlign: 'center', color: '#3D4127' }}
        >
          Trending Meals
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {currentMeals.map((meal) => (
            <Grid
              item
              key={meal.idMeal}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                onClick={() =>
                  this.props.navigate(`/recipe/${meal.idMeal}`)
                }
                sx={{
                  width: 250,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                    cursor: 'pointer',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                  sx={{ height: 180, objectFit: 'cover' }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    p: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: '#3D4127',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
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
            size="small"
            siblingCount={siblingCount}
            boundaryCount={boundaryCount}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#2a2c20ff',
                borderColor: '#D4DE95',
                minWidth: 32,
                fontSize: 12,
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: '#D4DE95',
                color: '#fff',
              },
              '& .Mui-selected': { backgroundColor: '#3D4127', color: '#fff' },
            }}
          />
        </Box>
      </Box>
    );
  }
}

export default withRouter(TrendingMeals);
