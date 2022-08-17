import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const TABLE_HEADERS = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'URL'];

  const { planets, filters } = useContext(PlanetsContext);

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
