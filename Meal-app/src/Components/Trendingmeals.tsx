import React, { Component } from 'react';
import MealCarousel from './MealCarousel';
import { withRouter } from './withRouter';
import MealCard from './MealCard';

class TrendingMeals extends Component<any> {
  render() {
    return (
      <MealCarousel
        title="Trending Meals"
        apiUrl="https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast"
        loadingText="Loading trending meals..."
        navigate={this.props.navigate}
      />
    );
  }
}

export default withRouter(TrendingMeals);
