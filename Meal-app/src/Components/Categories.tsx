import React, { Component } from "react";
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
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { withRouter } from "./withRouter";
import { FavoritesContext } from "./FavoritesContext";

class Categories extends Component<any, any> {
  static contextType = FavoritesContext;
  declare context: React.ContextType<typeof FavoritesContext>;

  state = {
    categories: [],
    selectedCategory: "",
    meals: [],
    isMobile: window.innerWidth < 600,
    currentPage: 1,
  };

  componentDidMount() {
    this.fetchCategories();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => this.setState({ isMobile: window.innerWidth < 600 });

  fetchCategories = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categories = res.data.categories.map((cat: any) => cat.strCategory);
    this.setState({ categories });
  };

  fetchMeals = async (category: string) => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    this.setState({ meals: res.data.meals, currentPage: 1 });
  };

  handleCategoryChange = (category: string) => {
    this.setState({ selectedCategory: category });
    this.fetchMeals(category);
  };

  handleMealClick = (idMeal: string) => {
    this.props.navigate(`/recipe/${idMeal}`);
  };

  handleFavorite = (meal: any, e: any) => {
    e.stopPropagation();
    const { addFavorite, removeFavorite, isFavorite } = this.context;
    if (isFavorite(meal.idMeal)) removeFavorite(meal.idMeal);
    else addFavorite(meal);
  };

  render() {
    const { categories, selectedCategory, meals, isMobile, currentPage } =
      this.state;
    const { isFavorite } = this.context;

    const mealsPerPage = 5;
    const totalPages = Math.ceil(meals.length / mealsPerPage) || 1;
    const currentMeals = meals.slice(
      (currentPage - 1) * mealsPerPage,
      currentPage * mealsPerPage
    );

    return (
      <Box sx={{ 
         backgroundColor: '#D4DE95',
    minHeight: '100vh', 
    width: '100%',     
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    pb: 3,      
      }}>
        <Toolbar />
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 ,mt:10}}>
          Categories
        </Typography>

        {isMobile ? (
          <FormControl
            fullWidth
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                borderRadius: 1,
                border: "1px solid #ccc",
                padding: "6px 12px",
              },
              "& .MuiSelect-select": {
                padding: "6px 12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <InputLabel sx={{ display: "none" }}>Select Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => this.handleCategoryChange(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            {categories.map((cat) => (
              <Grid item key={cat}>
                <Paper
                  onClick={() => this.handleCategoryChange(cat)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === cat ? "#7A9E7E" : "#BAC095",
                    color: selectedCategory === cat ? "#fff" : "#3D4127",
                    minWidth: 100,
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#a9b17f" },
                  }}
                >
                  {cat}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedCategory && (
          <>
            <Grid container spacing={3} justifyContent="center">
              {currentMeals.map((meal) => (
                <Grid
                  item
                  key={meal.idMeal}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    onClick={() => this.handleMealClick(meal.idMeal)}
                    sx={{
                      position: "relative",
                      maxWidth: 360,
                      width: "100%",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    <Box
                      component="img"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      sx={{ width: "100%", height: "70%", objectFit: "cover" ,}}
                    />
                    <IconButton
                      onClick={(e) => this.handleFavorite(meal, e)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: isFavorite(meal.idMeal) ? "red" : "grey",
                      }}
                    >
                      {isFavorite(meal.idMeal) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <Box sx={{ p: 1, textAlign: "center", bgcolor: "#f9f9f9" }}>
                      <Typography>{meal.strMeal}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, val) => this.setState({ currentPage: val })}
                  color="primary"
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
