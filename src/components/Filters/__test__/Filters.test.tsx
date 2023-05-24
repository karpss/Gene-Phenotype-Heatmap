/* eslint-disable */
// Work in progress...
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filters from '..';

describe('Filters', () => {
  const setGenesMock = vi.fn();
  const setFilterMock = vi.fn();
  const onFilterChangeMock = vi.fn();
  const setPhenotypeMock = vi.fn();
  const setPercentageMock = vi.fn();
  const setPageMock = vi.fn();

  // const geneSelections = [
  //   { value: 'gene1', label: 'Gene 1' },
  //   { value: 'gene2', label: 'Gene 2' },
  // ];

  it('handles percentage filter change', () => {
    render(
      <Filters
        genes={['gene1']}
        setGenes={setGenesMock}
        setFilter={setFilterMock}
        onFilterChange={onFilterChangeMock}
        phenotype={['phen1']}
        setPhenotype={setPhenotypeMock}
        percentage={30}
        setPercentage={setPercentageMock}
        setPage={setPageMock}
        page={0}
        filter="genes_list"
      />
    );

    const percentageFilterInput = screen.getByLabelText(
      'Filter top 10% of the genes that have the highest phenotype count'
    );
    fireEvent.change(percentageFilterInput, { target: { value: '20' } });

    expect(setPercentageMock).toHaveBeenCalledWith(20);
    expect(onFilterChangeMock).toHaveBeenCalled();
  });

  it('handles reset button click', () => {
    render(
      <Filters
        genes={['gene1']}
        setGenes={setGenesMock}
        setFilter={setFilterMock}
        onFilterChange={onFilterChangeMock}
        phenotype={['phen1']}
        setPhenotype={setPhenotypeMock}
        percentage={30}
        setPercentage={setPercentageMock}
        setPage={setPageMock}
        page={0}
        filter="genes_list"
      />
    );

    const resetButton = screen.getByRole('button', { name: 'Reset Filter' });
    fireEvent.click(resetButton);

    expect(setPhenotypeMock).toHaveBeenCalledWith([]);
    expect(setGenesMock).toHaveBeenCalledWith([]);
    expect(setPercentageMock).toHaveBeenCalledWith(0);
    expect(setFilterMock).toHaveBeenCalledWith(undefined);
    expect(setPageMock).toHaveBeenCalledWith(0);
    expect(onFilterChangeMock).toHaveBeenCalled();
  });
});
