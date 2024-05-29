import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

function TodoList({ children }) {
  return <ul className={styles.TodoList}>{children}</ul>
}

TodoList.propTypes = {
  children: PropTypes.node,
}

export { TodoList }
