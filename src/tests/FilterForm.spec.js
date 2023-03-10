import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PlanetsProvider from '../context/Planets.provider';
import FilterForm from '../components/FilterForm';

describe('Teste do componente "FilterForm"', () => {
  it('Verifica se todos os componentes estão sendo renderizados na tela', () => {
    render(
      <PlanetsProvider>
        <FilterForm />
      </PlanetsProvider>,
    );

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
  });

  it('Verifica se os valores estão sendo alterados corretamente no formulário', () => {
    render(
      <PlanetsProvider>
        <FilterForm />
      </PlanetsProvider>,
    );

    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    userEvent.type(nameFilter, 'fomulário');
    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(valueFilter, '12');

    expect(nameFilter).toHaveValue('fomulário');
    expect(columnFilter).toHaveValue('diameter');
    expect(comparisonFilter).toHaveValue('igual a');
    expect(valueFilter).toHaveValue(12);

    const columnSort = screen.getByTestId('column-sort');
    const sortByAsc = screen.getByTestId('column-sort-input-asc');
    const sortByDesc = screen.getByTestId('column-sort-input-desc');

    userEvent.click(sortByAsc);
    expect(sortByAsc.checked).toBe(true);

    userEvent.selectOptions(columnSort, ['rotation_period']);
    userEvent.click(sortByDesc);

    expect(columnSort).toHaveValue('rotation_period');
    expect(sortByDesc.checked).toBe(true);
    expect(sortByAsc.checked).toBe(false);
  });
});