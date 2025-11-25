import AuthForm from '../Components/AuthForm'
import {render,screen,waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'

const mockNavigate = jest.fn();
const mockOnAuthSuccess = jest.fn();

jest.mock('../Components/withRouter', () => ({
  withRouter: (Component) => (props) => (
    <Component 
      {...props} 
      navigate={mockNavigate} 
      onAuthSuccess={mockOnAuthSuccess} 
    />
  ),
}));

describe('Authform',()=>{

     beforeEach(() => {
        jest.clearAllMocks();
    });

    test('rendering 1st',()=>{
        render(<AuthForm/>)
        const inputelement=screen.getByRole('textbox');
        expect(inputelement).toBeInTheDocument();
    })
    test('rendering login',()=>{
        render(<AuthForm/>)
        const buttonelement=screen.getByRole('button',{name:
            "Login"
        });
        expect(buttonelement).toBeInTheDocument();
    })
    test('rendering Signup',()=>{
        render(<AuthForm/>)
        const buttonelement2=screen.getByRole('button',{name:
            "Sign Up"
        });
        expect(buttonelement2).toBeInTheDocument();
    })
    test('placeholder checks',()=>{
        render(<AuthForm/>)
        const placecheck=screen.getByPlaceholderText('Enter your email');
        expect(placecheck).toBeInTheDocument();
    })
    test('text check',()=>{
        render(<AuthForm/>)
        const textelement=screen.getByText("Login");
        expect(textelement).toBeInTheDocument();
    })
    test('title check',()=>{
        render(<AuthForm/>)
        const titleelement=screen.getByTitle("close");
        expect(titleelement).toBeInTheDocument();
    })
     test('text',() => {
            render(<AuthForm mode='login'/>)
            const textelement = screen.getByText(/Don't have an account/i);
            expect(textelement).toBeInTheDocument();
    })
    test('flow',async () => {
        user.setup();
        render(<AuthForm mode='signup'/>)
        const nameelement=screen.getByLabelText('Full Name');
        const emailelement=screen.getByLabelText('Email');
        const passelement=screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Sign Up' });
        const submitButton2 = screen.getByRole('button', { name: 'Login' });
        await user.tab();
        expect(nameelement).toHaveFocus();
        await user.tab();
        expect(emailelement).toHaveFocus();
        await user.tab();
        expect(passelement).toHaveFocus();
        await user.tab();
        expect(submitButton).toHaveFocus();
        await user.tab();
        expect(submitButton2).toHaveFocus();
    })

    test("snapshot",() => {
        expect(render(<AuthForm/>)).toMatchSnapshot();
    })

    test('Sign up', () => {
        render(<AuthForm mode="login" />);
        const signUpLink = screen.getByRole('button', { name: /Sign Up/i });
        expect(signUpLink).toBeInTheDocument();
    });

    test('validation', async () => {
        user.setup();
        render(<AuthForm mode="login" />);
        const submitButton = screen.getByRole('button', { name: /Login/i });
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
        });
        expect(mockOnAuthSuccess).not.toHaveBeenCalled();
    });


    test('password length', async () => {
        user.setup();
        render(<AuthForm mode="signup" />);
        
        const passwordInput = screen.getByLabelText(/Password/i);
        const submitButton = screen.getByRole('button', { name: /Sign Up/i });

        await user.type(passwordInput, '12345'); 
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
        });
        expect(mockOnAuthSuccess).not.toHaveBeenCalled();
    });

})
