import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Info from './Info';

test('loads and displays correct info', async () => {
    const settings = {
        start: '2021-01-01',
        end: '2021-06-30',
        magnitude: 5,
        speed: 5
    };

    render(<Info settings={settings} />)
    const infoElem = screen.getByText(/info/i);
    expect(infoElem).toBeInTheDocument(); 

    const startElem = screen.getByText(/start: 2021-01-01/i);
    expect(startElem).toBeInTheDocument();

    const endElem = screen.getByText(/end: 2021-06-30/i);
    expect(endElem).toBeInTheDocument();

    const magnitudeElem = screen.getByText(/magnitude: 5/i);
    expect(magnitudeElem).toBeInTheDocument();

    const speecElem = screen.getByText(/speed: 5/i);
    expect(speecElem).toBeInTheDocument();
})