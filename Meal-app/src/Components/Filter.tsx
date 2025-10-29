
import React, { Component } from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { withRouter } from './withRouter';
import CategoryIcon from '@mui/icons-material/Category';
import PublicIcon from '@mui/icons-material/Public';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const APPBAR_HEIGHT = 80;

class FilterPage extends Component {
  state = {
    categories: [],
    areas: [],
    ingredients: [],
    selectedCategory: '',
    selectedArea: '',
    selectedIngredient: '',
    meals: [],
  };

  async componentDidMount() {
    try {
      const [categoriesRes, areasRes, ingredientsRes] = await Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list'),
      ]);

      const [categoriesData, areasData, ingredientsData] = await Promise.all([
        categoriesRes.json(),
        areasRes.json(),
        ingredientsRes.json(),
      ]);

      this.setState({
        categories: categoriesData.meals,
        areas: areasData.meals,
        ingredients: ingredientsData.meals,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleFilter = async () => {
    const { selectedCategory, selectedArea, selectedIngredient } = this.state;
    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    if (selectedCategory) url += `c=${selectedCategory}&`;
    if (selectedArea) url += `a=${selectedArea}&`;
    if (selectedIngredient) url += `i=${selectedIngredient}&`;
    url = url.slice(0, -1);

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ meals: data.meals || [] });
    } catch (error) {
      console.error(error);
      this.setState({ meals: [] });
    }
  };

  render() {
    const {
      categories,
      areas,
      ingredients,
      selectedCategory,
      selectedArea,
      selectedIngredient,
      meals,
    } = this.state;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#f5f5f5',
          overflowX:'hidden',
          overflowY: 'hidden'
        }}
      >
        <Box sx={{ height: `${APPBAR_HEIGHT}px` }} />

        <Box sx={{ width: '100%', maxWidth: 600, mt: 2, mx: 'auto', px: 2 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              width: '100%',
              borderRadius: 0,
            }}
          >
            <FormControl sx={{ minWidth: 180, flex: 1 }}>
              <InputLabel>
                <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Category
              </InputLabel>
              <Select
                name="selectedCategory"
                value={selectedCategory}
                onChange={this.handleChange}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.strCategory} value={cat.strCategory}>
                    {cat.strCategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180, flex: 1 }}>
              <InputLabel>
                <PublicIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Area
              </InputLabel>
              <Select
                name="selectedArea"
                value={selectedArea}
                onChange={this.handleChange}
              >
                <MenuItem value="">All</MenuItem>
                {areas.map((area) => (
                  <MenuItem key={area.strArea} value={area.strArea}>
                    {area.strArea}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180, flex: 1 }}>
              <InputLabel>
                <RestaurantIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Ingredient
              </InputLabel>
              <Select
                name="selectedIngredient"
                value={selectedIngredient}
                onChange={this.handleChange}
              >
                <MenuItem value="">All</MenuItem>
                {ingredients.map((ing) => (
                  <MenuItem key={ing.strIngredient} value={ing.strIngredient}>
                    {ing.strIngredient}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#30413496',
                color: '#fff',
                minHeight: '56px',
                px: 5,
                '&:hover': { backgroundColor: '#50bb69ff' },
              }}
              onClick={this.handleFilter}
            >
              Search
            </Button>
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1, width: '100vw', mt: 6, mx: 0 }}>
          <Box sx={{ width: '100%' }}>
            {meals.length === 0 ? (
              <Typography
                sx={{ textAlign: 'center', color: '#777', fontSize: 18, mt: 4 }}
              >
                No meals to show. Use the filter above.
              </Typography>
            ) : (
              <Grid container spacing={3} justifyContent="center">
                {meals.map((meal) => (
                  <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
                    <Paper
                      onClick={() =>
                        this.props.navigate(`/recipe/${meal.idMeal}`)
                      }
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: 350,
                        mx: 'auto',
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                          transform: 'scale(1.03)',
                        },
                      }}
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                      <Typography sx={{ mt: 1, fontWeight: 500 }}>
                        {meal.strMeal}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withRouter(FilterPage);
