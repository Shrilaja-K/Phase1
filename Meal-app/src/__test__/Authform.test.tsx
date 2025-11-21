import AuthForm from '../Components/AuthForm'
import {render,screen} from '@testing-library/react'

describe('Authform',()=>{
    test('rendering 1st',()=>{
        render(<AuthForm/>)
        const inputelement=screen.getByRole('textbox');
        expect(inputelement).toBeInTheDocument();
    })
    test('rendering login',()=>{
        render(<AuthForm/>)
        const buttonelement=screen.getByRole('button',{
            name:"Login"
        });
        expect(buttonelement).toBeInTheDocument();
    })
    test('rendering Signup',()=>{
        render(<AuthForm/>)
        const buttonelement2=screen.getByRole('button',{
            name:"Sign Up"
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
    

})
