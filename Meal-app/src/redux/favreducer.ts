import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
 
} from './favactions'; 
import type { FavoriteActionTypes,Meal} from './favactions'


interface FavoritesState {
  items: Meal[];
}

const initialState: FavoritesState = {
  items: [],
};

const favreducer = (
  state = initialState,
  action: FavoriteActionTypes
): FavoritesState => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (!state.items.find((m) => m.idMeal === action.payload.idMeal)) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state;

    case REMOVE_FAVORITE:
      return {
        ...state,
        items: state.items.filter((m) => m.idMeal !== action.payload),
      };

    default:
      
      return state;
  }
};

export default favreducer;
