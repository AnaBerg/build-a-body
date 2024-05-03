import { describe, it, expect, afterEach } from 'bun:test';
import { render, screen, cleanup } from '@testing-library/react';

import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    render(<ComingSoon pageName="Test Page" />);

    const comingSoon = await screen.findByText('Test Page');

    expect(comingSoon).toBeTruthy();
  });
});
