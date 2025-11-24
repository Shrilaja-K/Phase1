import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ContactUs from '../Components/ContactUs'; 

describe('ContactUs', () => {

  test('form fields', () => {
    render(<ContactUs loggedIn={false} />);
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes).toHaveLength(3); 
  });
 
  test('button', () => {
    render(<ContactUs loggedIn={false} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1); 
  });

  test(' contact us form flow', () => {
    render(<ContactUs loggedIn={false} />);
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('fills mail', () => {
    const mockUserEmail = 'adad@gmail.com';
    render(<ContactUs loggedIn={true} userEmail={mockUserEmail} />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveValue(mockUserEmail);
    expect(emailInput).toBeInTheDocument();
  });

  test('not fill the mail', () => {
    render(<ContactUs loggedIn={false} />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveValue('');
  });

});