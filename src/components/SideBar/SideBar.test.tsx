import { describe, it, expect, afterEach, beforeEach, mock } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';

import SideBar from './SideBar';

describe('SideBar', () => {
  const routes = [
    {
      path: '/meal/dashboard',
      name: 'Dashboard',
      icon: <div>Icon</div>,
    },
    {
      path: '/meal/register',
      name: 'Register',
      icon: <div>Icon</div>,
    },
    {
      path: '/meal/macros',
      name: 'Macros',
      icon: <div>Icon</div>,
    },
  ];

  beforeEach(() => {
    mock.module('next/navigation', () => ({
      usePathname: () => routes[0].path,
    }));
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    render(<SideBar title="Test" routes={routes} />);

    const title = await screen.findByText('Test');

    const link1 = screen.getByTestId(`link-${routes[0].name}`);
    const link2 = screen.getByTestId(`link-${routes[1].name}`);
    const link3 = screen.getByTestId(`link-${routes[2].name}`);

    expect(title).toBeTruthy();
    expect(link1).toBeTruthy();
    expect(link2).toBeTruthy();
    expect(link3).toBeTruthy();

    expect(link1.classList.contains('text-foreground')).toBeTruthy();
    expect(link2.classList.contains('text-foreground/60')).toBeTruthy();
    expect(link3.classList.contains('text-foreground/60')).toBeTruthy();
  });
});
