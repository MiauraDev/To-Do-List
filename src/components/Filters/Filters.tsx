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
  const dragState = useRef({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
  })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: containerRef.current!.offsetLeft,
      offsetY: containerRef.current!.offsetTop,
      dragging: true,
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return
    dragState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      offsetX: containerRef.current!.offsetLeft,
      offsetY: containerRef.current!.offsetTop,
      dragging: true,
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    if (!dragState.current.dragging) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    containerRef.current!.style.left = `${dragState.current.offsetX + dx}px`
    containerRef.current!.style.top = `${dragState.current.offsetY + dy}px`
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (!dragState.current.dragging || e.touches.length !== 1) return
    const dx = e.touches[0].clientX - dragState.current.startX
    const dy = e.touches[0].clientY - dragState.current.startY
    containerRef.current!.style.left = `${dragState.current.offsetX + dx}px`
    containerRef.current!.style.top = `${dragState.current.offsetY + dy}px`
  }

  const handleMouseUp = () => {
    dragState.current.dragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchEnd = () => {
    dragState.current.dragging = false
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowContainer(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, {
      passive: true,
    })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
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
        <div className={styles.Container} ref={containerRef} id="mydiv">
          <div
            className={styles.mydivheader}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          ></div>
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
