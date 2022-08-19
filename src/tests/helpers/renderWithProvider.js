import { render } from '@testing-library/react';

import PlanetsProvider from '../../context/Planets.provider';

export default (component) => {
  return render(
    <PlanetsProvider>
      {component}
    </PlanetsProvider>,
  );
};
