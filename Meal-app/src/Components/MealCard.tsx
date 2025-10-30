import React, { Component } from 'react';
import { FavoritesContext } from './FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

interface Props {
  meal: any;
  onClick?: () => void; 
}

class MealCard extends Component<Props> {
  static contextType = FavoritesContext;
  declare context: React.ContextType<typeof FavoritesContext>;

  handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { meal } = this.props;
    const isFavorited = this.context.favorites.some((m: any) => m.idMeal === meal.idMeal);

    if (isFavorited) {
      this.context.removeFavorite(meal.idMeal);
    } else {
      this.context.addFavorite(meal);
    }
  };

  render() {
    const { meal, onClick } = this.props;
    const isFavorited = this.context.favorites.some((m: any) => m.idMeal === meal.idMeal);

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
          onClick={this.handleFavorite}
          sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.7)' }}
        >
          <FavoriteIcon color={isFavorited ? 'error' : 'disabled'} />
        </IconButton>
      </div>
    );
  }
}

export default MealCard;
