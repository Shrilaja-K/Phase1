import React, { Component, createRef } from 'react';
import { withRouter } from './withRouter';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

class TSweets extends Component {
  state = {
    meals: [],
    itemsPerRow: 5,
  };

  carouselRef = createRef();
  animationId = null;
  scrollPosition = 0;

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    try {
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
      );
      const data = await res.json();
      this.setState({ meals: data.meals || [] }, this.startAutoScroll);
    } catch (err) {
      console.error('Error fetching meals:', err);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    cancelAnimationFrame(this.animationId);
  }

  handleResize = () => {
    const width = window.innerWidth;
    if (width < 600) {
      this.setState({ itemsPerRow: 1 });
    } else if (width < 900) {
      this.setState({ itemsPerRow: 2 });
    } else if (width < 1200) {
      this.setState({ itemsPerRow: 3 });
    } else if (width < 1600) {
      this.setState({ itemsPerRow: 4 });
    } else {
      this.setState({ itemsPerRow: 5 });
    }
  };

  startAutoScroll = () => {
    const step = 0.5; 
    const animate = () => {
      if (this.carouselRef.current) {
        this.scrollPosition += step;

        if (
          this.scrollPosition >=
          this.carouselRef.current.scrollWidth / 2
        ) {
          this.scrollPosition = 0;
        }

        this.carouselRef.current.style.transform = `translateX(-${this.scrollPosition}px)`;
      }
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  };

  handleCardClick = (id) => {
    this.props.navigate(`/recipe/${id}`);
  };

  render() {
    const { meals } = this.state;

    if (!meals.length)
      return (
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Loading Desserts...
        </Typography>
      );

    const scrollMeals = [...meals, ...meals];

    return (
      <Box sx={{ width: '100%', py: 4, position: 'relative', overflow: 'hidden' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 4,
            textAlign: 'center',
            color: '#3D4127',
          }}
        >
          Sugar Rush
        </Typography>

       
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: 320,
          }}
        >
          
          <Box
            ref={this.carouselRef}
            sx={{
              display: 'flex',
              gap: 16,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {scrollMeals.map((meal, index) => (
              <Card
                key={`${meal.idMeal}-${index}`}
                onClick={() => this.handleCardClick(meal.idMeal)}
                sx={{
                  width: 220,
                  height: 300,
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default withRouter(TSweets);
