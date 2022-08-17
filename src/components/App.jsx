import React, { useEffect, useContext } from 'react';

import fetchStarWarsPlanets from '../services/fetchStarWarsPlanets';

import PlanetsContext from '../context/Planets.context';
import FilterForm from './FilterForm';
import Table from './Table';

function App() {
  const { updatePlanets, planets } = useContext(PlanetsContext);

  useEffect(() => {
    fetchStarWarsPlanets().then((data) => {
      console.log(data);
      updatePlanets(data?.results || []);
    });
  }, []);

  console.log(planets);

  return (
    <main>
      <FilterForm />
      <Table />
    </main>
  );
}

export default App;
