// Components/Categories.tsx
import React, { Component } from 'react';
import { Box, Typography, Paper, Grid, Toolbar } from '@mui/material';

interface CategoriesState {
  categories: string[];
}

class Categories extends Component<{}, CategoriesState> {
  state: CategoriesState = {
    categories: [
      'Breakfast',
      'Lunch',
      'Dinner',
      'Desserts',
      'Snacks',
      'Drinks',
    ],
  };

  render() {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          p: 2,
        }}
      >
        {/* Toolbar spacer for fixed AppBar */}
        <Toolbar />

        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: 'center', color: '#3D4127' }}
        >
          Categories
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {this.state.categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#BAC095',
                  color: '#3D4127',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#a9b17f',
                  },
                }}
              >
                {category}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default Categories;
