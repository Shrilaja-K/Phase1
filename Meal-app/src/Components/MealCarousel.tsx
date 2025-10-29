import React, { Component, createRef } from 'react';
import { Box, Typography } from '@mui/material';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Props {
  title: string;
  apiUrl: string;
  loadingText?: string;
  navigate: (path: string) => void;
}

interface State {
  meals: Meal[];
}

class MealCarousel extends Component<Props, State> {
  state: State = { meals: [] };
  carouselRef = createRef<HTMLDivElement>();
  scrollPos = 0;
  animationId: number | null = null;

  async componentDidMount() {
    try {
      const res = await fetch(this.props.apiUrl);
      const data = await res.json();
      this.setState({ meals: data.meals || [] }, this.startScroll);
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  startScroll = () => {
    const step = 0.5;
    const animate = () => {
      if (this.carouselRef.current) {
        this.scrollPos += step;
        if (this.scrollPos >= this.carouselRef.current.scrollWidth / 2) this.scrollPos = 0;
        this.carouselRef.current.style.transform = `translateX(-${this.scrollPos}px)`;
      }
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  };

  handleClick = (id: string) => {
    this.props.navigate(`/recipe/${id}`);
  };

  render() {
    const { meals } = this.state;
    const { title, loadingText = 'Loading meals...' } = this.props;

    if (!meals.length) return <Typography textAlign="center">{loadingText}</Typography>;

    const scrollMeals = [...meals, ...meals];

    return (
      <Box sx={{ width: '100%', py: 4, overflow: 'hidden' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          {title}
        </Typography>
        <Box sx={{ position: 'relative', display: 'flex', height: 320 }}>
          <Box ref={this.carouselRef} sx={{ display: 'flex', position: 'absolute', gap: 1 }}>
            {scrollMeals.map((meal, idx) => (
              <Box
                key={`${meal.idMeal}-${idx}`}
                onClick={() => this.handleClick(meal.idMeal)}
                sx={{
                  width: 220,
                  height: 300,
                  flexShrink: 0,
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                  transition: '0.2s',
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: 'center',
                    mt: 1,
                    px: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {meal.strMeal}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default MealCarousel;
