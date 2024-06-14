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

  useEffect(() => {
    const elmnt = containerRef.current
    if (!elmnt) return

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0

    const header = document.getElementById(elmnt.id + 'header')
    if (header) {
      header.onmousedown = dragMouseDown
    } else {
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault()
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault()
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      if (elmnt) {
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
      }
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }

    return () => {
      if (header) {
        header.onmousedown = null
      } else {
        elmnt.onmousedown = null
      }
      document.onmouseup = null
      document.onmousemove = null
    }
  }, [showContainer])

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
        <div className={styles.Container} ref={containerRef} id="mydiv">
          <div id="mydivheader" className={styles.mydivheader}></div>
          <div className={styles.filters}>
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
        </div>
      )}
    </div>
  )
}

export { Filters }
