import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  const getPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const dataApi = await response.json();
    setData(dataApi.results);
  };

  const contextData = {
    data, setData, getPlanets,
  };

  return (
    <PlanetsContext.Provider value={ contextData }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(String).isRequired,
};

export default PlanetsProvider;
