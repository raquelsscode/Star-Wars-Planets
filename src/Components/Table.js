import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, planetName, setPlanetName, getPlanets } = useContext(PlanetsContext);
  const [dataFilter, setDataFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    getPlanets();
  }, []);

  const { filterByNumericValues, filterByName: { name } } = dataFilter;

  useEffect(() => {
    const filterPlanets = data.filter(
      (item) => item.name.toLowerCase().includes(name),
    );

    const arrayPlanet = filterByNumericValues.reduce((acc, crr) => acc.filter((item) => {
      switch (crr.comparison) {
      case 'maior que':
        return Number(item[crr.column]) > Number(crr.value);
      case 'menor que':
        return Number(item[crr.column]) < Number(crr.value);
      case 'igual a':
        return Number(item[crr.column]) === Number(crr.value);
      default:
        return true;
      }
    }), filterPlanets);

    setPlanetName(arrayPlanet);

    if (filterByNumericValues.length > 0) {
      setIsDisabled(false);
    }
  }, [name, filterByNumericValues]);

  const handlePlanet = ({ target }) => {
    setDataFilter(
      { ...dataFilter,
        filterByName: {
          name: target.value.toLowerCase(),
        } },
    );
  };

  const handleNumberFilter = () => {
    setDataFilter({
      ...dataFilter,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  const deleteFilter = (index) => {
    const newArray = filterByNumericValues.filter(
      ((_filter, indexFilter) => index !== indexFilter),
    );

    setDataFilter({
      ...dataFilter,
      filterByNumericValues: newArray,
    });
  };

  const removeAllFilters = () => {
    setDataFilter({
      ...dataFilter,
      filterByNumericValues: [],
    });
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
      <select
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        onChange={ ({ target }) => setComparison(target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        placeholder="Digite um valor"
        value={ value }
        onChange={ ({ target }) => setValue(Number(target.value)) }
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumberFilter }
      >
        Filtrar
      </button>
      <div>
        {
          <button
            data-testid="button-remove-filters"
            type="button"
            disabled={ isDisabled }
            onClick={ removeAllFilters }
          >
            Remover todos os filtros
          </button>
        }

        {
          filterByNumericValues.map((item, index) => (
            <p
              key={ index }
              data-testid="filter"
            >
              {`${item.column} 
              ${item.comparison} 
              ${item.value}`}

              <button
                type="button"
                id={ index }
                onClick={ () => deleteFilter(index) }
              >
                Remover Filtro
              </button>
            </p>
          ))
        }
      </div>
      <table>
        <thead>
          <tr>
            {title.map((infos, index) => (<th key={ index }>{infos}</th>))}
          </tr>
        </thead>
        <tbody>
          {planetName.map((planet) => (
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
