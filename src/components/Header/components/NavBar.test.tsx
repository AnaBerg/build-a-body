import { describe, it, expect, mock, jest, afterEach } from 'bun:test';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';

mock.module('next-themes', () => ({
  useTheme: () => ({
    setTheme: jest.fn(),
    theme: 'light',
  }),
}));

describe('NavBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    mock.module('next/navigation', () => ({
      usePathname: () => '/',
    }));

    render(<NavBar />);

    const exercise = await screen.findByText('Exercise');
    const meal = await screen.findByText('Meal');

    expect(exercise).toBeTruthy();
    expect(meal).toBeTruthy();
  });

  it('should render with the correct css classes if is in the correct path', async () => {
    mock.module('next/navigation', () => ({
      usePathname: () => '/exercise',
    }));

    render(<NavBar />);

    const exercise = await screen.findByText('Exercise');
    const meal = await screen.findByText('Meal');

    expect(exercise.classList.contains('text-foreground')).toBeTruthy();
    expect(meal.classList.contains('text-foreground/60')).toBeTruthy();
  });
});
