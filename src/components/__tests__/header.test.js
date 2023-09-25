import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import appStore from '../../utils/store/appStore';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Header Component Tests', () => {
  it('Should render Header Component with a Cart items 0', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText('Cart 🛒 (0)');

    expect(cartItems).toBeInTheDocument();
  });

  it('Should render Header Component with a Cart item', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText(/Cart/);

    expect(cartItems).toBeInTheDocument();
  });

  it('Should render Header Component with a Groceries item', () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText(/Grocery/);

    expect(cartItems).toBeInTheDocument();
  });
});
