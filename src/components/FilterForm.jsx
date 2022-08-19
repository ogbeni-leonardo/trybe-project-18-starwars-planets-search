import React, { useState, useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const [formData, setFormData] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
    columnToSort: 'population',
    orderBy: 'ASC',
  });

  const {
    filters, setNameFilter, setColumnFilter, setSortFilter,
  } = useContext(PlanetsContext);

  const COLUMN_FILTERS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'name') setNameFilter(value);
  };

  const setFilterByColumn = () => {
    setColumnFilter({ [formData.column]: [formData.comparison, formData.value] });

    const selectNextOption = COLUMN_FILTERS
      .filter((column) => column !== formData.column
      && !Object.keys(filters.filteredByColumns).includes(column))[0];

    setFormData((prevState) => ({ ...prevState, column: selectNextOption }));
  };

  const setSortByColumn = () => {
    setSortFilter([formData.columnToSort, formData.orderBy]);
  };

  return (
    <form data-testid="filter-form">
      <label htmlFor="name">
        <input
          data-testid="name-filter"
          type="text"
          id="name"
          name="name"
          value={ formData.name }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="column">
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          onChange={ handleChange }
          value={ formData.column }
          defaultChecked
        >
          { COLUMN_FILTERS
            .filter((column) => !Object.keys(filters.filteredByColumns).includes(column))
            .map((column, index) => (
              <option key={ index } value={ column } defaultChecked>{column}</option>
            )) }
        </select>
      </label>

      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          onChange={ handleChange }
          value={ formData.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value">
        <input
          data-testid="value-filter"
          type="number"
          id="value"
          name="value"
          value={ formData.value }
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ setFilterByColumn }
      >
        Filter
      </button>

      <label htmlFor="columnToSort">
        <select
          data-testid="column-sort"
          id="columnToSort"
          name="columnToSort"
          onChange={ handleChange }
          value={ formData.columnToSort }
        >
          { COLUMN_FILTERS.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="orderBy">
        <input
          type="radio"
          name="orderBy"
          onChange={ handleChange }
          data-testid="column-sort-input-asc"
          value="ASC"
        />
      </label>

      <label htmlFor="orderBy">
        <input
          type="radio"
          name="orderBy"
          onChange={ handleChange }
          data-testid="column-sort-input-desc"
          value="DESC"
        />
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ setSortByColumn }
      >
        Ordenar
      </button>
    </form>
  );
};
