import React from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import nochekIcon from '../../assets/icons/nocheck.svg'
import sicheckIcon from '../../assets/icons/sicheck.svg'

function TodoItem({ text, completed, onComplete, onDelete, priority }) {
  const getPriorityClass = () => {
    if (priority === 'Urgente') return styles.Urgent
    if (priority === 'Importante') return styles.Important
    if (priority === 'No urgente') return styles.NotUrgent
    return ''
  }

  return (
    <li className={styles.TodoItemContainer}>
      <span className={styles.TodoItemDelete} onClick={onDelete}>
        ✕
      </span>
      <span
        className={`${styles.Priority} ${getPriorityClass()}`}
        onClick={onComplete}
      >
        ●
      </span>
      <p
        className={`${styles.TodoItemText} ${
          completed ? styles.TodoItemTextActive : ''
        }`}
        title={text}
      >
        {text}
      </p>

      <span
        className={styles.TodoItemCheck}
        onClick={onComplete}
        style={{
          backgroundImage: `url(${completed ? sicheckIcon : nochekIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </li>
  )
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
}

export { TodoItem }
