import styles from './styles.module.css'
import PropTypes from 'prop-types'
import iconfilter from '../../assets/icons/filters.png'
import React, { useState } from 'react'

function Filters({ onFilterAlphabet, onFilterCreation, onFilterPriority }) {
  const [showContainer, setShowContainer] = useState(false)

  const handleIconClick = () => {
    setShowContainer(!showContainer)
  }

  return (
    <div>
      <img
        src={iconfilter}
        alt="iconfilter"
        className={styles.iconfilter}
        onClick={handleIconClick}
      />

      {showContainer && (
        <div className={styles.Container}>
          <p>Filtrar por:</p>
          <button className={styles.Alphabet} onClick={onFilterAlphabet}>
            Alfabeto
          </button>
          <button className={styles.Creation} onClick={onFilterCreation}>
            Creación
          </button>
          <button className={styles.Priority} onClick={onFilterPriority}>
            Prioridad
          </button>
        </div>
      )}
    </div>
  )
}

Filters.propTypes = {
  onFilterAlphabet: PropTypes.func.isRequired,
  onFilterCreation: PropTypes.func.isRequired,
  onFilterPriority: PropTypes.func.isRequired,
}

export { Filters }
