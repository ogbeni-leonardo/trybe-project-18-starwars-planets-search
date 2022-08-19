import React, { useState } from 'react';
import { node } from 'prop-types';

import PlanetsContext from './Planets.context';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filteredByName: '',
    filteredByColumns: {},
    sortedByColumn: [],
  });

  const updatePlanets = (arrayOfPlanets) => {
    const planetsWithoutResidents = arrayOfPlanets
      .map((planet) => { delete planet.residents; return planet; });

    setPlanets(planetsWithoutResidents);
  };

  const setNameFilter = (value) => {
    setFilters((prevState) => ({ ...prevState, filteredByName: value }));
  };

  const setColumnFilter = (object) => {
    setFilters((prevState) => ({
      ...prevState,
      filteredByColumns: { ...prevState.filteredByColumns, ...object },
    }));
  };

  const removeColumnFilter = (key) => {
    const removeFilter = { ...filters.filteredByColumns }; delete removeFilter[key];
    setFilters((prevState) => ({ ...prevState, filteredByColumns: removeFilter }));
  };

  const clearAllColumnFilters = () => {
    setFilters((prevState) => ({ ...prevState, filteredByColumns: {} }));
  };

  const setSortFilter = (array) => {
    setFilters((prevState) => ({ ...prevState, sortedByColumn: array }));
  };

  return (
    <PlanetsContext.Provider
      value={ {
        clearAllColumnFilters,
        filters,
        planets,
        removeColumnFilter,
        setColumnFilter,
        setNameFilter,
        setSortFilter,
        updatePlanets,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: node.isRequired,
};
