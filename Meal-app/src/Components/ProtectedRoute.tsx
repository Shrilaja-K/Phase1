import React, { Component, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  loggedIn: boolean;
  children: ReactNode;
}

class ProtectedRoute extends Component<Props> {
  render() {
    const { loggedIn, children } = this.props;
    if (!loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }
}

export default ProtectedRoute;
