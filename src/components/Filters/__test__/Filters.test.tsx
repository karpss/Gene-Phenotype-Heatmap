/* eslint-disable */
//Work in progress...
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Filters from '..';

describe('Filters', () => {
  it('handles gene filter correctly', () => {
    const setGenesMock = vi.fn();
    const setFilterMock = vi.fn();
    const onFilterChangeMock = vi.fn();
    const setPhenotypeMock = vi.fn();
    const setPercentageMock = vi.fn();
    const setPageMock = vi.fn();
    

    const geneSelections = [
      { value: 'gene1', label: 'Gene 1' },
      { value: 'gene2', label: 'Gene 2' },
    ];

    const { getByLabelText } = render(
      <Filters
        genes={['gene1']}
        setGenes={setGenesMock}
        setFilter={setFilterMock}
        onFilterChange={onFilterChangeMock}
        data={{ gene_list: geneSelections }}
        phenotype={['phen1']}
        setPhenotype={setPhenotypeMock}
        percentage={30}
       setPercentage={setPercentageMock}
       setPage={setPageMock}
       page={0}
       filter="genes_list"
       
      />
    );

    fireEvent.change(getByLabelText('Filter by gene list:'), {
      target: { value: 'gene2' },
    });

    expect(setGenesMock).toHaveBeenCalledWith(['gene1', 'gene2']);
    expect(setFilterMock).toHaveBeenCalledWith('genes_list');
    expect(onFilterChangeMock).toHaveBeenCalled();
  });



});