
import React, { Component } from 'react';
import { withRouter } from './withRouter';
import AuthForm from './AuthForm';

class Login extends Component<any> {
  handleLogin = (username: string) => {
    this.props.onLogin(username); 
  };

  render() {
    return <AuthForm mode="login" onAuthSuccess={this.handleLogin} navigate={this.props.navigate} />;
  }
}

export default withRouter(Login);
