import React, { Component } from 'react';
import MealCarousel from './MealCarousel';
import { withRouter } from './withRouter';

class Sweets extends Component<any> {
  render() {
    return (
      <MealCarousel
        title="Sugar Rush"
        apiUrl="https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
        loadingText="Loading desserts..."
        navigate={this.props.navigate}
      />
    );
  }
}

export default withRouter(Sweets);
