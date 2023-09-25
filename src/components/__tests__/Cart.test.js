import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Menu from '../Menu';
import Header from '../Header';
import Cart from '../Cart';
import { Provider } from 'react-redux';
import appStore from '../../utils/store/appStore';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import HotelMenuMock from './__mocks__/HotelMenuMock.json';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(HotelMenuMock)
  })
);

describe('Cart Component Tests', () => {
  it('should Load Restaurant Menu Component', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <Menu />
            <Cart />
          </Provider>
        </BrowserRouter>
      )
    );

    const accordionHeader = screen.getByText('Round The Year (4)');
    fireEvent.click(accordionHeader);

    expect(screen.getByText('Cart 🛒 (0)')).toBeInTheDocument();

    const addBtns = screen.getAllByRole('button', { name: 'Add +' });
    fireEvent.click(addBtns[0]);

    expect(screen.getByText('Cart 🛒 (1)')).toBeInTheDocument();

    fireEvent.click(addBtns[1]);

    expect(screen.getByText('Cart 🛒 (2)')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear Cart' }));

    expect(
      screen.getByText('Cart is empty. Add Items to the cart!')
    ).toBeInTheDocument();
  });
});
