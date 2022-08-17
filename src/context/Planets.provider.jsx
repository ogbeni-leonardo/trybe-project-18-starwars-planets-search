import React, { useState } from 'react';
import { node } from 'prop-types';

import PlanetsContext from './Planets.context';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    byName: '',
    byColumn: [],
  });

  const updatePlanets = (arrayOfPlanets) => {
    const planetsWithoutResidents = arrayOfPlanets
      .map((planet) => { delete planet.residents; return planet; });

    setPlanets(planetsWithoutResidents);
  };

  const setFilter = (key, value) => {
    setFilters((prevState) => ({ ...prevState, [key]: value }));
  };

  console.log(filters);

  return (
    <PlanetsContext.Provider value={ { planets, updatePlanets, filters, setFilter } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: node.isRequired,
};
