import React from "react";
import PropTypes from 'prop-types';
import css from './filter.module.css';

const Filter = ({ filter, onFilterChange }) => {

  const handleFilterChange = event => {
    const { value } = event.target; onFilterChange(value);
  };

  return (
    <div>
      <label className={css.filterLabel} htmlFor="filterInput">
        Find contacts by name
      </label>
      <input
        className={css.filterInput}
        id="filterInput"
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;