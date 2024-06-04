import React, { ChangeEvent } from 'react'
import styles from './styles.module.css'
import searchIcon from '/icons/search.svg'

interface TodoSearchProps {
  searchValue: string
  setSearchValue: (value: string) => void
}

const TodoSearch: React.FC<TodoSearchProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

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
        onChange={handleChange}
      />
    </div>
  )
}

export { TodoSearch }
