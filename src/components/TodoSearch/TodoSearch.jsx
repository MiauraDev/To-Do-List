import React from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import searchIcon from '../../assets/icons/search.svg'

function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <div className={styles['search-container']}>
      <img
        src={searchIcon}
        alt="Search Icon"
        className={styles['search-icon']}
      />
      <input
        type="text"
        placeholder="Search your task..."
        className={styles.search}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value)
        }}
      />
    </div>
  )
}

TodoSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
}

export { TodoSearch }
