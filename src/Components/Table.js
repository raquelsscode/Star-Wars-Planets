import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, getPlanets,
    planetName, setPlanetName } = useContext(PlanetsContext);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    function FilterPlanetName(planet) {
      const filterPlanets = data.filter(
        (item) => item.name.toLowerCase().includes(planet.toLowerCase()),
      );
      setDataFilter(filterPlanets);
    }
    FilterPlanetName(planetName.filterByName.name);
  }, [data, planetName.filterByName.name]);

  const handlePlanet = ({ target }) => {
    setPlanetName(
      { ...planetName,
        filterByName: {
          name: target.value,
        } },
    );
  };

  const title = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  return (
    <div>
      <input
        type="text"
        placeholder="Procure um Planeta"
        onChange={ handlePlanet }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            {title.map((infos, index) => (<th key={ index }>{infos}</th>))}
          </tr>
        </thead>
        <tbody>
          {dataFilter.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films.map((element) => element) }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
