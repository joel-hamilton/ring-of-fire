import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Settings from './Settings';

test('loads and displays correct info', async () => {
    const settings = {
        start: '2021-01-01',
        end: '2021-06-30',
        magnitude: 5,
        speed: 5
    };

    render(<Settings settings={settings} onUpdate={() => { }} />)
    const infoElem = screen.getByText(/setting/i);
    expect(infoElem).toBeInTheDocument();
})