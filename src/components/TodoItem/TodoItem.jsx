import React from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import nochekIcon from '../../assets/icons/nocheck.svg'
import sicheckIcon from '../../assets/icons/sicheck.svg'

function TodoItem({ text, completed, onToggle }) {
  return (
    <li className={styles['TodoItem-container']}>
      <span className={styles['TodoItem-delete']}>✕</span>
      <p className={styles['TodoItem-text']}>{text}</p>
      <span
        className={styles['TodoItem-check']}
        onClick={onToggle}
        style={{
          backgroundImage: `url(${completed ? sicheckIcon : nochekIcon})`,
        }}
      />
    </li>
  )
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.number.isRequired,
  onToggle: PropTypes.bool.isRequired,
}

export { TodoItem }
