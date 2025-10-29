import React, { Component } from 'react';
import { Box, Paper, Typography, Grid, Pagination } from '@mui/material';

interface MealGridProps {
  meals: any[];
  onMealClick: (idMeal: string) => void;
  isMobile: boolean;
  currentPage: number;
  mealsPerPage: number;
  onPageChange: (event: any, value: number) => void;
}

class MealGrid extends Component<MealGridProps> {
  render() {
    const { meals, onMealClick, isMobile, currentPage, mealsPerPage, onPageChange } = this.props;

    const totalPages = Math.ceil(meals.length / mealsPerPage) || 1;
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

    return (
      <Box>
        <Grid container spacing={3} justifyContent="center">
          {currentMeals.map((meal: any) => (
            <Grid item key={meal.idMeal} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                onClick={() => onMealClick(meal.idMeal)}
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={onPageChange}
              color="primary"
              shape="rounded"
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Box>
    );
  }
}

export default MealGrid;
