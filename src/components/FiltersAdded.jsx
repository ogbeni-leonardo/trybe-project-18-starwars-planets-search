import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const {
    filters, removeColumnFilter, clearAllColumnFilters,
  } = useContext(PlanetsContext);

  return (
    <section data-testid="filters-added">
      { filters.filteredByColumns
        && Object.keys(filters.filteredByColumns)
          .map((key) => (
            <div key={ key } data-testid="filter">
              <p>
                {`${key} ${filters.filteredByColumns[key][0]} ${
                  filters.filteredByColumns[key][1]}`}
              </p>

              <button
                type="button"
                data-testid="remove-filter"
                onClick={ () => removeColumnFilter(key) }
              >
                Remover filtro
              </button>
            </div>
          )) }

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clearAllColumnFilters }
      >
        Clean all filters
      </button>
    </section>
  );
};
