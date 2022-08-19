import React, { useEffect, useContext } from 'react';

import fetchStarWarsPlanets from '../services/fetchStarWarsPlanets';

import PlanetsContext from '../context/Planets.context';
import FilterForm from './FilterForm';
import FiltersAdded from './FiltersAdded';
import Table from './Table';

function App() {
  const { updatePlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchStarWarsPlanets().then((data) => {
      updatePlanets(data?.results || []);
    });
  }, []);

  return (
    <main>
      <FilterForm />
      <FiltersAdded />
      <Table />
    </main>
  );
}

export default App;
