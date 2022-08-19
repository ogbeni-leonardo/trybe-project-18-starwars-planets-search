import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const TABLE_HEADERS = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
  ];

  const { planets, filters } = useContext(PlanetsContext);

  const columnOperator = (value, operator, comparison) => {
    if (operator === 'maior que') return value > comparison;
    if (operator === 'menor que') return value < comparison;
    if (operator === 'igual a') return value === comparison;
  };

  const planetsFilteredByColumn = (planet) => {
    if (Object.keys(filters.filteredByColumns).length === 0) return true;

    const isItAValidPlanet = [];

    Object.entries(filters.filteredByColumns).forEach(([column, filter]) => {
      isItAValidPlanet.push(columnOperator(
        Number(planet[column]), filter[0], Number(filter[1]),
      ));
    });

    return !isItAValidPlanet.includes(false);
  };

  const planetsSortedByColumn = (current, next) => {
    const currentValue = current[filters.sortedByColumn[0]];
    const nextValue = next[filters.sortedByColumn[0]];

    if (filters.sortedByColumn[1] === 'ASC') {
      if (currentValue === 'unknown') return 1;
      if (nextValue === 'unknown') return 0 - 1;
      return currentValue - nextValue;
    }

    return nextValue - currentValue;
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
          .filter((planet) => planet.name.match(new RegExp(filters.filteredByName, 'i')))
          .filter((planet) => planetsFilteredByColumn(planet))
          .sort(planetsSortedByColumn)
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
