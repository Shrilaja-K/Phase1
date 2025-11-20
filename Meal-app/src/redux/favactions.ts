
export const ADD_FAVORITE = 'Favorites/addFavorite';
export const REMOVE_FAVORITE = 'Favorites/removeFavorite';


export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: Meal;
}

interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: string; 
}


export type FavoriteActionTypes = AddFavoriteAction | RemoveFavoriteAction;


export const addFavorite = (meal: Meal): AddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: meal,
});

export const removeFavorite = (idMeal: string): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: idMeal,
});
