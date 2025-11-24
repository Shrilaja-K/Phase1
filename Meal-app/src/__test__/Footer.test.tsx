
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer'; 
describe('alltest',()=>{
test('Footer', () =>  {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const expectedText = `© ${currentYear} Meal Mate. All rights reserved.`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

// test('Footer', () =>  {
//     render(<Footer />);

//     const currentYear = new Date().getFullYear();
//     const expectedText = `© ${currentYear}  Mate. All rights reserved.`;
//     expect(screen.getByText(expectedText)).toBeInTheDocument();
//   });
})
