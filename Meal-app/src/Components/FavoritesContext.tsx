
import React from "react";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FavoritesContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (idMeal: string) => void;
  isFavorite: (idMeal: string) => boolean;
  clearFavorites: () => void;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
});

export class FavoritesProvider extends React.Component<
  { children: React.ReactNode },
  { favorites: Meal[] }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  addFavorite = (meal: Meal) => {
    this.setState((prev) => {
      if (prev.favorites.some((m) => m.idMeal === meal.idMeal)) return prev;
      return { favorites: [...prev.favorites, meal] };
    });
  };

  removeFavorite = (idMeal: string) => {
    this.setState((prev) => ({
      favorites: prev.favorites.filter((m) => m.idMeal !== idMeal),
    }));
  };

  isFavorite = (idMeal: string) => {
    return this.state.favorites.some((m) => m.idMeal === idMeal);
  };

  clearFavorites = () => {
    this.setState({ favorites: [] });
  };

  render() {
    const { favorites } = this.state;
    return (
      <FavoritesContext.Provider
        value={{
          favorites,
          addFavorite: this.addFavorite,
          removeFavorite: this.removeFavorite,
          isFavorite: this.isFavorite,
          clearFavorites: this.clearFavorites,
        }}
      >
        {this.props.children}
      </FavoritesContext.Provider>
    );
  }
}
