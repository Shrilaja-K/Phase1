import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ImageMovement from '../Components/Imagemovement'; 
import { MemoryRouter } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

global.setInterval = jest.fn();
global.clearInterval = jest.fn();

const mealmock = (id, name, instructions) => ({
  meals: [{
    idMeal: id,
    strMeal: name,
    strMealThumb: `thumbnail.com${id}`,
    strInstructions: instructions,
  }]
});

const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php'; 
const mockMeal1 = mealmock('1', 'Meal One', 'Instructions 1...');
const mockMeal2 = mealmock('2', 'Meal Two', 'Instructions 2...');
const mockMeal3 = mealmock('3', 'Meal Three', 'Instructions 3...');


describe('Imagemovement', () => {
  beforeEach(() => {
    mockAxios.reset();
    jest.clearAllMocks(); 
    
    mockAxios.onGet(API_URL).replyOnce(200, mockMeal1);
    mockAxios.onGet(API_URL).replyOnce(200, mockMeal2);
    mockAxios.onGet(API_URL).replyOnce(200, mockMeal3);
    mockAxios.onGet(API_URL).replyOnce(200, mockMeal1);
    mockAxios.onGet(API_URL).replyOnce(200, mockMeal2);
  });

  test('random meals', async () => {
    render(
    <MemoryRouter>
        <ImageMovement />
    </MemoryRouter>);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockAxios.history.get).toHaveLength(5);
      
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.getByText('Meal One')).toBeInTheDocument();
      expect(screen.getByAltText('Meal One')).toBeInTheDocument();
    });
  });
});
