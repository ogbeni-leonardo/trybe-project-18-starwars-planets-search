import React, { useState } from 'react';
import { node } from 'prop-types';

import PlanetsContext from './Planets.context';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const updatePlanets = (arrayOfPlanets) => {
    const planetsWithoutResidents = arrayOfPlanets
      .map((planet) => { delete planet.residents; return planet; });

    setPlanets(planetsWithoutResidents);
  };

  return (
    <PlanetsContext.Provider value={ { planets, updatePlanets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: node.isRequired,
};
