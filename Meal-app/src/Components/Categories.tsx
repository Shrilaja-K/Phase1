import React, { Component } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Pagination,
} from '@mui/material';
import axios from 'axios';
import { withRouter } from './withRouter';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface CategoriesState {
  categories: string[];
  selectedCategory: string;
  meals: Meal[];
  isMobile: boolean;
  currentPage: number;
}

class Categories extends Component<any, CategoriesState> {
  state: CategoriesState = {
    categories: [],
    selectedCategory: '',
    meals: [],
    isMobile: window.innerWidth < 600,
    currentPage: 1,
  };

  componentDidMount() {
    this.fetchCategories();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 600 });
  };

  fetchCategories = async () => {
    try {
      const res = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      const categories = res.data.categories.map((cat: any) => cat.strCategory);
      this.setState({ categories });
    } catch (error) {
      console.error(error);
    }
  };

  fetchMeals = async (category: string) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      this.setState({ meals: res.data.meals, currentPage: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  handleCategoryChange = (category: string) => {
    this.setState({ selectedCategory: category });
    this.fetchMeals(category);
  };

  handleMealClick = (idMeal: string) => {
    this.props.navigate(`/recipe/${idMeal}`);
  };

  handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    this.setState({ currentPage: value });
  };

  render() {
    const {
      categories,
      selectedCategory,
      meals,
      isMobile,
      currentPage,
    } = this.state;

    const mealsPerPage = 5;
    const totalPages = Math.ceil(meals.length / mealsPerPage) || 1;
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

    return (
      <Box sx={{ p: 2, mt: 10, width: '100%', boxSizing: 'border-box' }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#3D4127' }}>
          Categories
        </Typography>

        {isMobile ? (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Select Category"
              onChange={(e) => this.handleCategoryChange(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            {categories.map((category) => (
              <Grid item key={category}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor:
                      selectedCategory === category ? '#7A9E7E' : '#BAC095',
                    color: selectedCategory === category ? '#fff' : '#3D4127',
                    minWidth: 100,
                    textAlign: 'center',
                    border: selectedCategory === category ? '2px solid #3D4127' : '2px solid transparent',
                    '&:hover': { backgroundColor: '#a9b17f' },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => this.handleCategoryChange(category)}
                >
                  {category}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedCategory && (
          <>
            <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ width: '100%', mx: 'auto', boxSizing: 'border-box', mb: 4 }}>
              {currentMeals.map((meal) => (
                <Grid item key={meal.idMeal} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Paper
                    onClick={() => this.handleMealClick(meal.idMeal)}
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      textAlign: 'center',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: '0.2s',
                      '&:hover': { transform: 'scale(1.03)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' },
                    }}
                  >
                    <Box component="img" src={meal.strMealThumb} alt={meal.strMeal} sx={{ width: '100%', height: '70%', objectFit: 'cover' }} />
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', p: 1 }}>
                      <Typography sx={{ fontWeight: 500, color: '#3D4127', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '90%' }}>
                        {meal.strMeal}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={this.handlePageChange}
                  color="primary"
                  shape="rounded"
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    );
  }
}

export default withRouter(Categories);
