import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

interface LoginProps {
  onLogin: (username: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (username: string, email?: string) => {
    onLogin(username, email || '');
  };

  return <AuthForm mode="login" onAuthSuccess={handleLogin} navigate={navigate} />;
};

export default Login;
