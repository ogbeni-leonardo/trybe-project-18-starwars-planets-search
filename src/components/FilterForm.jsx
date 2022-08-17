import React, { useState, useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const [formData, setFormData] = useState({
    byName: '',
    byColumn: 'population',
    byComparison: 'maior que',
    byValue: '0',
  });

  const { setNameFilter, setColumnFilter } = useContext(PlanetsContext);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'byName') setNameFilter(value);
  };

  const filterByColumn = () => {
    setColumnFilter({
      [formData.byColumn]: [formData.byComparison, formData.byValue],
    });
  };

  return (
    <form>
      <label htmlFor="byName">
        <input
          data-testid="name-filter"
          type="text"
          id="byName"
          name="byName"
          value={ formData.byName }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="byColumn">
        <select
          data-testid="column-filter"
          id="byColumn"
          name="byColumn"
          onChange={ handleChange }
          value={ formData.byColumn }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="byComparison">
        <select
          data-testid="comparison-filter"
          id="byComparison"
          name="byComparison"
          onChange={ handleChange }
          value={ formData.byComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="byValue">
        <input
          data-testid="value-filter"
          type="number"
          id="byValue"
          name="byValue"
          value={ formData.byValue }
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterByColumn }
      >
        Filter
      </button>
    </form>
  );
};
