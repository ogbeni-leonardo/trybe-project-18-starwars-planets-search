import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import planetsMock from './mocks/planetsMock';

import PlanetsProvider from '../context/Planets.provider';
import App from '../components/App';
import userEvent from '@testing-library/user-event';

describe('Test do componente "App"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMock),
    });
  });

  it('Verifica se todos os componentes estão sendo renderizados na tela', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
    expect(screen.getByTestId('filters-added')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('Verifica se a quantidade de linhas da tabela é igual ao esperado', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryAllByRole('row')).toHaveLength(11);
  });

  it('Verifica se nenhuma nova linha é adicionada a tabela caso a requisição falhe', async () => {
    global.fetch = jest.fn(async () => Promise.reject());

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.queryAllByRole('row')).toHaveLength(1);
  });

  it('Verifica se, ao adicionar um filtro, ele é mostrado na tela podendo ser removido', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>,
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const addFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, ['diameter']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(valueFilter, '12');
    userEvent.click(addFilter);

    expect(screen.getByText(/diameter igual a 012/i)).toBeInTheDocument();
  });
});
