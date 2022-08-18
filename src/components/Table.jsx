import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const TABLE_HEADERS = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'URL'];

  const { planets, filters } = useContext(PlanetsContext);

  const columnOperator = (value, operator, comparison) => {
    if (operator === 'maior que') return value > comparison;
    if (operator === 'menor que') return value < comparison;
    if (operator === 'igual a') return value === comparison;
  };

  const planetsFilteredByColumn = (planet) => {
    if (Object.keys(filters.byColumns).length === 0) return true;
    const isItAValidPlanet = [];

    Object.entries(filters.byColumns).forEach(([column, filter]) => {
      const value = Number(planet[column]);
      const operator = filter[0];
      const comparison = Number(filter[1]);

      isItAValidPlanet.push(columnOperator(value, operator, comparison));
    });

    return !isItAValidPlanet.includes(false);
  };

  const sortBy = (a, b) => {
    const valueA = a[filters.sortBy[0]];
    const valueB = b[filters.sortBy[0]];

    console.log(valueA, valueB);

    if (filters.sortBy[1] === 'ASC') {
      if (valueA === 'unknown') return 1;
      if (valueB === 'unknown') return 0 - 1;

      return Number(valueA) - Number(valueB);
    }
    return valueB - valueA;
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
          .sort(sortBy)
          .map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
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
