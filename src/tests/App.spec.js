import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import planetsMock from './mocks/planetsMock';
import renderWithProvider from './helpers/renderWithProvider';

import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Test do componente "App"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMock),
    });
  });

  it('Verifica se todos os componentes estão sendo renderizados '
    + 'na tela', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByTestId('filter-form')).toBeInTheDocument();
      expect(screen.getByTestId('filters-added')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('Verifica se a quantidade de linhas da tabela é igual ao '
    + 'esperado', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.queryAllByRole('row')).toHaveLength(11);
  });

  it('Verifica se nenhuma nova linha é adicionada a tabela caso a '
    + 'requisição falhe', async () => {
      global.fetch = jest.fn(async () => Promise.reject());
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.queryAllByRole('row')).toHaveLength(1);
  });

  it('Verifica se, ao adicionar um filtro, ele é mostrado na tela '
    + 'podendo ser removido', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      userEvent.selectOptions(screen.getByTestId('column-filter'), ['diameter']);
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
      userEvent.type(screen.getByTestId('value-filter'), '12');
      userEvent.click(screen.getByTestId('button-filter'));

      expect(screen.getByText(/diameter igual a 012/i))
        .toBeInTheDocument();
      expect(screen.getByTestId('filter')).toBeInTheDocument();
      expect(screen.getByTestId('remove-filter')).toBeInTheDocument();
  });

  it('Verifica se os valores correspondentes ao filtro são renderizados '
    + 'corretamente', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      userEvent.selectOptions(screen.getByTestId('column-filter'), ['population']);
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
      userEvent.type(screen.getByTestId('value-filter'), '200000');
      userEvent.click(screen.getByTestId('button-filter'));

      expect(screen.getByText(/population igual a 0200000/i))
        .toBeInTheDocument();

      const tableRow = screen.getAllByRole('row');

      expect(tableRow).toHaveLength(2);
      expect(tableRow[1]).toHaveTextContent('Tatooine');
  });

  it('Verifica se o filtro de coluna é removido quando é aplicado', async () => {
    renderWithProvider(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('option', { name: 'population' })).toHaveLength(2);
    expect(screen.getAllByRole('option', { name: 'orbital_period' })).toHaveLength(2);
    expect(screen.getAllByRole('option', { name: 'diameter' })).toHaveLength(2);
    expect(screen.getAllByRole('option', { name: 'surface_water' })).toHaveLength(2);
    expect(screen.getAllByRole('option', { name: 'rotation_period' })).toHaveLength(2);

    const columnFilter = screen.getByTestId('column-filter');

    userEvent.selectOptions(columnFilter, ['population']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
    userEvent.type(screen.getByTestId('value-filter'), '200000');
    userEvent.click(screen.getByTestId('button-filter'));

    userEvent.click(screen.getByTestId('button-filter'));
    userEvent.click(screen.getByTestId('button-filter'));
    userEvent.click(screen.getByTestId('button-filter'));
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getAllByRole('option', { name: 'population' })).toHaveLength(1);
    expect(screen.getAllByRole('option', { name: 'orbital_period' })).toHaveLength(1);
    expect(screen.getAllByRole('option', { name: 'diameter' })).toHaveLength(1);
    expect(screen.getAllByRole('option', { name: 'surface_water' })).toHaveLength(1);
    expect(screen.getAllByRole('option', { name: 'rotation_period' })).toHaveLength(1);
  });

  it('Verifica se ao remover o filtro os valores originais são '
    + 'renderizados', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      userEvent.selectOptions(screen.getByTestId('column-filter'), ['population']);
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['menor que']);
      userEvent.type(screen.getByTestId('value-filter'), '10000000');
      userEvent.click(screen.getByTestId('button-filter'));

      expect(screen.getAllByRole('row')).toHaveLength(4);

      userEvent.click(screen.getByTestId('remove-filter'));
      expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('Verifica se a tabela é ordenada segundo o esperado pelos '
    + 'filtros', async () => {
      renderWithProvider(<App />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      const columnSort = screen.getByTestId('column-sort');
      const sortByAsc = screen.getByTestId('column-sort-input-asc');
      const sortByDesc = screen.getByTestId('column-sort-input-desc');
      const sortButton = screen.getByTestId('column-sort-button');

      userEvent.selectOptions(columnSort, ['population']);
      userEvent.click(sortByAsc);
      userEvent.click(sortButton);

      const ascTableCells = screen.getAllByRole('row');
      expect(ascTableCells[1]).toHaveTextContent(/Yavin IV/i);
      expect(ascTableCells.at(-1)).toHaveTextContent(/Dagobah/i);

      userEvent.click(sortByDesc);
      userEvent.click(sortButton);

      const descTableCells = screen.getAllByRole('row');
      expect(descTableCells[1]).toHaveTextContent(/Coruscant/i);
      expect(descTableCells.at(-1)).toHaveTextContent(/Dagobah/i);
  });
});
