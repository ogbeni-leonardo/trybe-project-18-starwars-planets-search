import React from 'react';
import { render, screen } from '@testing-library/react';

import PlanetsProvider from '../context/Planets.provider';
import Table from '../components/Table'

describe('Teste do componente Table', () => {
  it('Verifica se todos os headers esperados estão presentes', () => {
    const TABLE_HEADERS = [
      'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
      'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
      'Edited', 'URL',
    ];

    render(
      <PlanetsProvider>
        <Table />
      </PlanetsProvider>,
    );

    TABLE_HEADERS.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    });
  });  
});
