import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const TABLE_HEADERS = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'URL'];

  const { planets, filters } = useContext(PlanetsContext);

  const columnOperator = (value, operator, comparison) => {
    console.log(value);
    console.log(operator);
    console.log(comparison);
    console.log(comparison === value);
    if (operator === 'maior que') return value > comparison;
    if (operator === 'menor que') return value < comparison;
    if (operator === 'igual a') return value === comparison;
  };

  const planetsFilteredByColumn = (planet) => {
    if (filters.byColumn.length === 0) return true;
    return columnOperator(
      Number(planet[filters.byColumn[0]]),
      filters.byColumn[1],
      Number(filters.byColumn[2]),
    );
  };

  return (
    <table>
      <thead>
        <tr>
          { TABLE_HEADERS.map((header, index) => (<th key={ index }>{header}</th>)) }
        </tr>
      </thead>

      <tbody>
        { planets
          .filter((planet) => (planet.name).toLowerCase()
            .includes(filters.byName.toLowerCase()))
          .filter((planet) => planetsFilteredByColumn(planet))
          .map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) }
      </tbody>
    </table>
  );
};
