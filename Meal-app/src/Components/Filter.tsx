import React, { Component } from 'react';
import {
  Box,
  Paper,
  Button,
  Grid,
  Typography,
  Pagination,
  TextField,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { withRouter } from './withRouter';
import CategoryIcon from '@mui/icons-material/Category';
import PublicIcon from '@mui/icons-material/Public';
import RestaurantIcon from '@mui/icons-material/Restaurant';



const APPBAR_HEIGHT = 80;

class FilterPage extends Component<any> {
  state = {
    categories: [],
    areas: [],
    ingredients: [],
    selectedCategory: '',
    selectedArea: '',
    selectedIngredient: '',
    meals: [],
    currentPage: 1,
    lastFilters: null as any,
    
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
        categories: categoriesData.meals.map((c: any) => c.strCategory),
        areas: areasData.meals.map((a: any) => a.strArea),
        ingredients: ingredientsData.meals.map((i: any) => i.strIngredient),
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleFilter = async () => {
    const { selectedCategory, selectedArea, selectedIngredient, lastFilters } =
      this.state;

    const currentFilters = {
      category: selectedCategory,
      area: selectedArea,
      ingredient: selectedIngredient,
    };

    if (
      lastFilters &&
      lastFilters.category === currentFilters.category &&
      lastFilters.area === currentFilters.area &&
      lastFilters.ingredient === currentFilters.ingredient
    ) {
      return;
    }

    let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    if (selectedCategory) url += `c=${selectedCategory}&`;
    if (selectedArea) url += `a=${selectedArea}&`;
    if (selectedIngredient) url += `i=${selectedIngredient}&`;
    url = url.slice(0, -1);

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({
        meals: data.meals || [],
        currentPage: 1,
        lastFilters: currentFilters,
      });
    } catch (error) {
      console.error(error);
      this.setState({ meals: [], currentPage: 1, lastFilters: currentFilters });
    }
  };

  handlePageChange = (_event: any, value: number) => {
    this.setState({ currentPage: value });
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
      currentPage,
      
    } = this.state;

    const mealsPerPage = 6;
    const totalPages = Math.ceil(meals.length / mealsPerPage) || 1;
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#D4DE95',
          overflowX: 'hidden',
        }}
      >
        <Box sx={{ height: `${APPBAR_HEIGHT}px` }} />

       
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            mt: 2,
            mx: 'auto',
            px: { xs: 0, sm: 2 },
          }}
        >
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
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
            <Autocomplete
              options={categories}
              value={selectedCategory}
              onChange={(_e, newValue) =>
                this.setState({ selectedCategory: newValue || '' })
              }
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 180px' } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <>
                      <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Category
                    </>
                  }
                />
              )}
            />

            <Autocomplete
              options={areas}
              value={selectedArea}
              onChange={(_e, newValue) =>
                this.setState({ selectedArea: newValue || '' })
              }
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 180px' } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <>
                      <PublicIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Area
                    </>
                  }
                />
              )}
            />

            <Autocomplete
              options={ingredients}
              value={selectedIngredient}
              onChange={(_e, newValue) =>
                this.setState({ selectedIngredient: newValue || '' })
              }
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 180px' } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <>
                      <RestaurantIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Ingredient
                    </>
                  }
                />
              )}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#30413496',
                color: '#fff',
                minHeight: '56px',
                px: 5,
                flex: { xs: '1 1 100%', sm: 'auto' },
                '&:hover': { backgroundColor: '#2d5536ff' },
              }}
              onClick={this.handleFilter}
            >
              Search
            </Button>
          </Paper>
        </Box>

    
        <Box sx={{ flexGrow: 1, width: '100vw', mt: 6, mx: 0 }}>
          {meals.length === 0 ? (
            <Typography
              sx={{ textAlign: 'center', color: '#777', fontSize: 18, mt: 4 }}
            >
              No meals to show. Use the filter above.
            </Typography>
          ) : (
            <>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{
                  width: '100%',
                  mx: 'auto',
                  boxSizing: 'border-box',
                  mb: 4,
                }}
              >
                {currentMeals.map((meal: any) => (
                  <Grid
                    item
                    key={meal.idMeal}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Paper
                      onClick={() =>
                        this.props.navigate(`/recipe/${meal.idMeal}`)
                      }
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
                        position: 'relative',
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
                          height: '70%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f9f9f9',
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: '#3D4127',
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '90%',
                          }}
                        >
                          {meal.strMeal}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    mb: 4,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={this.handlePageChange}
                    color="primary"
                    shape="rounded"
                    size="medium"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    );
  }
}

export default withRouter(FilterPage);
