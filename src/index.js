import React from 'react';
import ReactDOM from 'react-dom';

import PlanetsProvider from './context/Planets.provider';
import App from './components/App';

ReactDOM.render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>,
  document.getElementById('root'),
);
