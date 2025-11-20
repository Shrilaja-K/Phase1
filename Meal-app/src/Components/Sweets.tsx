import React, { Component } from 'react';
import MealCarousel from './MealCarousel';
import { withRouter } from './withRouter';
import MealCard from './MealCard';
import { connect } from 'react-redux';
import { fetchDesserts } from '../redux/dessertsactions';


class Sweets extends Component<any, any> {
  componentDidMount() {
   
    this.props.fetchDesserts();
  }

  render() {
    const { dessertsData, navigate } = this.props;
    const { loading, desserts, error } = dessertsData;

    if (loading) {
      return <div>Loading desserts...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <MealCarousel
        title="Sugar Rush"
        meals={desserts} 
        navigate={navigate}
       
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    dessertsData: state.desserts, 
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchDesserts: () => dispatch(fetchDesserts()),
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sweets));
