
import React, { Component } from 'react';
import { withRouter } from './withRouter';
import AuthForm from './AuthForm';

class SignUp extends Component<any> {
  handleSignUp = (username: string) => {
    this.props.onSignUp(username); 
  };

  render() {
    return <AuthForm mode="signup" onAuthSuccess={this.handleSignUp} navigate={this.props.navigate} />;
  }
}

export default withRouter(SignUp);
