import styles from './styles.module.css'
import iconfilter from '/icons/filters.png'
import React, { useState } from 'react'

interface FiltersProps {
  onFilterAlphabet: () => void
  onFilterCreation: () => void
  onFilterPriority: () => void
}

const Filters: React.FC<FiltersProps> = ({
  onFilterAlphabet,
  onFilterCreation,
  onFilterPriority,
}) => {
  const [showContainer, setShowContainer] = useState<boolean>(false)

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

export { Filters }
