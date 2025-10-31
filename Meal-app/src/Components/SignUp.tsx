import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

interface SignUpProps {
  onSignUp: (username: string, email: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const navigate = useNavigate();

  const handleSignUp = (username: string, email?: string) => {
    onSignUp(username, email || '');
  };

  return <AuthForm mode="signup" onAuthSuccess={handleSignUp} navigate={navigate} />;
};

export default SignUp;
