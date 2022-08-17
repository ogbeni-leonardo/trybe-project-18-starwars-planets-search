import React, { useState, useContext } from 'react';

import PlanetsContext from '../context/Planets.context';

export default () => {
  const [formData, setFormData] = useState({
    byName: '',
  });

  const { setFilter } = useContext(PlanetsContext);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFilter(name, value);
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
    </form>
  );
};
