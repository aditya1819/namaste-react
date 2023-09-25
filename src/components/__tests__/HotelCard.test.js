import { render, screen } from '@testing-library/react';
import HotelCardMock from './__mocks__/HotelCardMock.json';
import HotelCard, { withOfferLable } from '../HotelCard';
import '@testing-library/jest-dom';

describe('Hotel Card Components Tests', () => {
  it('should render RestaurantCard component with props Data', () => {
    render(<HotelCard data={HotelCardMock.info} />);

    const name = screen.getByText('Veg Aroma');

    expect(name).toBeInTheDocument();
  });

  it('should render RestaurantCard component with Promoted Label', () => {
    const HotelCardOffer = withOfferLable(HotelCard);

    render(<HotelCardOffer data={HotelCardMock.info} />);

    const offer = screen.getByText('₹125 OFF');

    expect(offer).toBeInTheDocument();
  });
});
