import {render,screen} from '@testing-library/react'
import VideoSection from '../Components/Videosection'

describe('Videosection',() => {
    test('text',() => {
        render(<VideoSection/>)
        const textelement = screen.getByText('Discover Delicious Meals Worldwide');
        expect(textelement).toBeInTheDocument();
    })
    test('text',() => {
        render(<VideoSection/>)
        const textelement = screen.getByText('Explore thousands of recipes and find your next favorite dish!');
        expect(textelement).toBeInTheDocument();
    })
    test('text',() => {
        render(<VideoSection/>)
        const textelement = screen.getByText(content => content.startsWith('Explore'));
        expect(textelement).toBeInTheDocument();
    })
    test('text',() => {
        render(<VideoSection/>)
        const textelement = screen.getByText(content => content.endsWith('ide'));
        expect(textelement).toBeInTheDocument();
    })
})