import React, { useState } from 'react';
import { node } from 'prop-types';

import PlanetsContext from './Planets.context';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    byName: '',
    byColumns: {},
    sortBy: [],
  });

  const updatePlanets = (arrayOfPlanets) => {
    const planetsWithoutResidents = arrayOfPlanets
      .map((planet) => { delete planet.residents; return planet; });

    setPlanets(planetsWithoutResidents);
  };

  const setNameFilter = (value) => {
    setFilters((prevState) => ({ ...prevState, byName: value }));
  };

  const setColumnFilter = (object) => {
    setFilters((prevState) => ({
      ...prevState,
      byColumns: { ...prevState.byColumns, ...object },
    }));
  };

  const removeColumnFilter = (key) => {
    const removeFilter = { ...filters.byColumns };
    delete removeFilter[key];
    setFilters((prevState) => ({ ...prevState, byColumns: removeFilter }));
  };

  const cleanAllColumnFilters = () => {
    setFilters((prevState) => ({ ...prevState, byColumns: {} }));
  };

  const setSortFilter = (array) => {
    setFilters((prevState) => ({ ...prevState, sortBy: array }));
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        updatePlanets,
        filters,
        setNameFilter,
        setColumnFilter,
        removeColumnFilter,
        cleanAllColumnFilters,
        setSortFilter,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: node.isRequired,
};
