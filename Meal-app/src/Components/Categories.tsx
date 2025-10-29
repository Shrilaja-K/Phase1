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
}

class Categories extends Component<any, CategoriesState> {
  state: CategoriesState = {
    categories: [],
    selectedCategory: '',
    meals: [],
    isMobile: window.innerWidth < 600,
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
      this.setState({ meals: res.data.meals });
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

  render() {
    const { categories, selectedCategory, meals, isMobile } = this.state;

    return (
      <Box sx={{ p: 2, mt: 10, width: '100%', boxSizing: 'border-box',overflowY: 'hidden', overflowX: 'hidden' }}>
        <Toolbar />
        <Typography 
          variant="h4"
          sx={{ mb: 3, textAlign: 'center', color: '#3D4127' }}
        >
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
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor:
                      selectedCategory === category ? '#a9b17f' : '#BAC095',
                    color: '#3D4127',
                    minWidth: 100,
                    textAlign: 'center',
                    '&:hover': { backgroundColor: '#a9b17f' },
                  }}
                  onClick={() => this.handleCategoryChange(category)}
                >
                  {category}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

      
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2, md: 3 },
            
            mx: 'auto',
            overflowX:'hidden',
            boxSizing: 'border-box',
          }}
        >
          {meals.map((meal) => (
            <Paper
              key={meal.idMeal}
              onClick={() => this.handleMealClick(meal.idMeal)}
              sx={{
                width: {
                  xs: '100%', 
                  sm: 'calc(50% - 16px)', 
                 md: 'calc(25% - 18px)',
                },

                boxSizing: 'border-box',
                maxWidth:'100%',
                height: 350, 
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: '0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Box
                component="img"
                src={meal.strMealThumb}
                alt={meal.strMeal}
                sx={{
                  width: '100%',
                  height: 220, 
                  objectFit: 'cover',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                }}
              >
                <Typography sx={{ fontWeight: 500, color: '#3D4127' }}>
                  {meal.strMeal}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    );
  }
}

export default withRouter(Categories);
