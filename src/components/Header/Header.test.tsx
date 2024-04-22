import {
  describe,
  it,
  expect,
  mock,
  jest,
  beforeEach,
  afterEach,
} from 'bun:test';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    mock.module('next/navigation', () => ({
      usePathname: () => '/',
    }));

    mock.module('@clerk/nextjs', () => ({
      SignedIn: () => <div>Signed In</div>,
      UserButton: () => <button>User Button</button>,
      SignedOut: () => <div>Signed Out</div>,
      SignUpButton: () => <button>Sign Up</button>,
    }));

    mock.module('next-themes', () => ({
      useTheme: () => ({
        setTheme: onClick,
        theme: 'light',
      }),
    }));
  });

  afterEach(() => {
    cleanup();
  });

  it('should renders correctly', async () => {
    render(<Header />);

    const logo = await screen.findByText('Build-A-Body');

    expect(logo).toBeTruthy();
  });

  it('should call the onClick function when the button is clicked', async () => {
    render(<Header />);

    const themeButton = await screen.findByTestId('theme-button');
    fireEvent.click(themeButton);

    expect(onClick).toHaveBeenCalled();
  });
});
