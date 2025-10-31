import React, { Component } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

interface Props {
  meal: any;
  onClick?: () => void;
  onToggleFavorite?: (meal: any, isAdding: boolean) => void;
}


interface State {
  isFavorite: boolean;
}

class MealCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFavorite: this.checkIfFavorite(props.meal.idMeal),
    };
  }

  checkIfFavorite = (idMeal: string): boolean => {
    const data = localStorage.getItem('favorites');
    const favorites = data ? JSON.parse(data) : [];
    return favorites.some((m: any) => m.idMeal === idMeal);
  };

  toggleFavorite = (e: React.MouseEvent) => {
  e.stopPropagation();
  const { meal, onToggleFavorite } = this.props;
  const data = localStorage.getItem('favorites');
  const favorites = data ? JSON.parse(data) : [];

  let updatedFavorites;
  let isAdding = false;

  if (this.state.isFavorite) {
    updatedFavorites = favorites.filter((m: any) => m.idMeal !== meal.idMeal);
  } else {
    updatedFavorites = [...favorites, meal];
    isAdding = true;
  }

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

  this.setState({ isFavorite: !this.state.isFavorite }, () => {
    if (onToggleFavorite) onToggleFavorite(meal, isAdding);
  });
};



  render() {
    const { meal, onClick } = this.props;
    const { isFavorite } = this.state;

    return (
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        onClick={onClick}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
        <div style={{ padding: 8 }}>
          <strong>{meal.strMeal}</strong>
        </div>
        <IconButton
          onClick={this.toggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'disabled'} />
        </IconButton>
      </div>
    );
  }
}

export default MealCard;
