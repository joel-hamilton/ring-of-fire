import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FeatureMap from './FeatureMap';

test('loads and displays map', async () => {
    render(<FeatureMap featuresCollection={{ type: "FeatureCollection", features: [] }} />)
    const mapElem = screen.getByLabelText(/map/i);
    expect(mapElem).toBeInTheDocument();
})