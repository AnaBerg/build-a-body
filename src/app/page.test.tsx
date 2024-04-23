import { screen, render } from '@testing-library/react';
import { expect, describe, it } from 'bun:test';

import Page from './page';

describe('Page', () => {
  it('should render the page', async () => {
    render(<Page />);

    const text = await screen.findByText('Home Page');

    expect(text).toBeTruthy();
  });
});
