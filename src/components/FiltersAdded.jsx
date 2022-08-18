import React, { useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const {
    filters,
    removeColumnFilter,
    cleanAllColumnFilters,
  } = useContext(PlanetsContext);

  return (
    <section data-testid="filters-added">
      Eu sou a área de filtros adicionados.
      { filters.byColumns && Object.keys(filters.byColumns).map((key) => (
        <div key={ key } data-testid="filter">
          <p>
            {`${key} ${filters.byColumns[key][0]} ${filters.byColumns[key][1]}`}
          </p>

          <button
            type="button"
            onClick={ () => removeColumnFilter(key) }
          >
            Apagar filtro
          </button>
        </div>
      )) }

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ cleanAllColumnFilters }
      >
        Clean all filters

      </button>
    </section>
  );
};
