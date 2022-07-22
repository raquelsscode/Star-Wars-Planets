import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../TableCSS/Table.css';

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
  const [value, setValue] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const compare = dataFilter.filterByNumericValues.map((item) => item.column);
  const filterOptions = options.filter((item) => !compare.includes(item));
  console.log(planetName);

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
    'Population'];

  return (
    <div>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
      <div className="Initialimage">
        <img src="https://i.ibb.co/VjV0W9n/planets.png" alt="planets" border="0" />
      </div>
      <div className="inputs">
        <div className="forms">
          <input
            type="text"
            placeholder="Procure um Planeta"
            onChange={ handlePlanet }
            data-testid="name-filter"
          />
        </div>
        <div className="forms">
          <select
            onChange={ ({ target }) => setColumn(target.value) }
            data-testid="column-filter"
          >
            {filterOptions.map((item, index) => (
              <option
                key={ index }
              >
                { item }
              </option>
            ))}
          </select>
        </div>
        <div className="forms">
          <select
            onChange={ ({ target }) => setComparison(target.value) }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </div>
        <div className="forms">
          <input
            type="number"
            placeholder="Digite um valor"
            onChange={ ({ target }) => setValue(Number(target.value)) }
            data-testid="value-filter"
          />
        </div>
        <button
          className="forms"
          type="button"
          data-testid="button-filter"
          onClick={ handleNumberFilter }
        >
          Filtrar
        </button>

        <button
          className="forms"
          data-testid="button-remove-filters"
          type="button"
          disabled={ isDisabled }
          onClick={ removeAllFilters }
        >
          Remover todos os filtros
        </button>
      </div>
      <div>

        {
          filterByNumericValues.map((item, index) => (
            <div key={ index } className="filter">
              <h3
                data-testid="filter"
              >
                {`${item.column} 
              ${item.comparison} 
              ${item.value}`}
              </h3>

              <button
                type="button"
                id={ index }
                onClick={ () => deleteFilter(index) }
              >
                Remover Filtro
              </button>
            </div>
          ))
        }
      </div>
      <div className="tabela table table-striped">
        <table className="table-dark">
          <thead>
            <tr className="bg-warning">
              {title.map((infos, index) => (<th key={ index }>{infos}</th>))}
            </tr>
          </thead>
          <tbody className="comBordaSimples">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
