import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import iconfilter from '/icons/filters.png'

interface FiltersProps {
  onFilterAlphabet: () => void
  onFilterCreation: () => void
  onFilterPriority: () => void
  isAsc: boolean
  filter: string | null
}

const Filters: React.FC<FiltersProps> = ({
  onFilterAlphabet,
  onFilterCreation,
  onFilterPriority,
  isAsc,
  filter,
}) => {
  const [showContainer, setShowContainer] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowContainer(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleIconClick = () => {
    setShowContainer(!showContainer)
  }

  const getEmoji = () => {
    const emojiClass = isAsc ? styles.EmojiAsc : styles.EmojiDesc
    return <span className={emojiClass}>{isAsc ? '⇅' : '⮃'}</span>
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
        <div className={styles.Container} ref={containerRef}>
          <p>Filtrar por:</p>
          <button className={styles.Alphabet} onClick={onFilterAlphabet}>
            Alfabeto {filter === 'alphabet' && getEmoji()}
          </button>
          <button className={styles.Creation} onClick={onFilterCreation}>
            Creación {filter === 'creation' && getEmoji()}
          </button>
          <button className={styles.Priority} onClick={onFilterPriority}>
            Prioridad {filter === 'priority' && getEmoji()}
          </button>
        </div>
      )}
    </div>
  )
}

export { Filters }
