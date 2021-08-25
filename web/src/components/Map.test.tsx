import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Map from './Map';

test('loads and displays map', async () => {
    render(<Map />)
    const mapElem = screen.getByLabelText(/map/i);
    expect(mapElem).toBeInTheDocument();
})