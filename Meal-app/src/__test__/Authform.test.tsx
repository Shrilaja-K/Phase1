import {AuthForm} from '../Components/AuthForm'
import {render,screen} from '@testing-library/react'

describe('Authform',()=>{
    test('rendering',()=>{
        render(<AuthForm/>)
        const inputelement=screen.getByRole('textbox');
        expect(inputelement).toBeInTheDocument();
    })
})
