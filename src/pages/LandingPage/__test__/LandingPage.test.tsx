import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '..';

describe('Landing Page Details', () => {
  it('renders Header', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const headerElement1 = screen.getByText(/About Us/i);
    const headerElement2 = screen.getByText(/Our Research/i);
    const headerElement3 = screen.getByText(/Learn More/i);
    expect(headerElement1).toBeInTheDocument();
    expect(headerElement2).toBeInTheDocument();
    expect(headerElement3).toBeInTheDocument();
  });

  it('renders Headline Text', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const headlineText = screen.getByText(/Introduction to IMPC Embryo Data/i);
    expect(headlineText).toBeInTheDocument();
  });

  it('click use heatmap', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.getByText('Use Heatmap')).toBeInTheDocument();
  });
});
