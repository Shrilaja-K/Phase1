import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (username: string, email: string) => {
    dispatch(login({ username, email }));
    navigate('/');
  };
  
  return <AuthForm mode="login" onAuthSuccess={handleLogin} navigate={navigate} />;
};
export default Login;