
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitFor} from "@testing-library/react";
import Recipe from '../Components/Recipe'; 
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

const mealmock = (id, name, instructions) => ({
  idMeal: id,
  strMeal: name,
  strMealThumb: `thumbnail.com${id}`,
  strInstructions: instructions,
});

const MEAL_ID = '1'; 
const mockMeal = mealmock(
  MEAL_ID, 
  'Meal One', 
  'Instructions for cooking' 
);

const API_URL_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MEAL_ID}`;

describe("Recipe", () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
    mockAxios.onGet(API_URL_ID).reply(200, { meals: [mockMeal] });
  });

  test('api fetch', async () => {
    render(
      <MemoryRouter initialEntries={[`/recipe/${MEAL_ID}`]}>
        <Routes>
            <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </MemoryRouter>
    );


    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => {
      
      expect(screen.getByText('Meal One')).toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

      const mealImage = screen.getByRole('img', { name: /Meal One/i });
      expect(mealImage).toBeInTheDocument();
      expect(mealImage).toHaveAttribute('src', `thumbnail.com${MEAL_ID}`);
    });
  });

  ``


});

