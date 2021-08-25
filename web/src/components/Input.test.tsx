import { render, screen } from '@testing-library/react';
import Input from './Input';

test('range has correct range', async () => {
    render(<Input.Range min={2} max={50} name="test-range" value={25} />)
    const sliderElem = screen.getByRole(/slider/i);
    expect(sliderElem).toBeInTheDocument();
})