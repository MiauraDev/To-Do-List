import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { ProgressCircle } from './ProgressCircle'

function TodoCounter({ total, completed }) {
  return (
    <div className={styles.ProgressContainer}>
      <div>
        <div className={styles.ProgressCount}>
          <h1>Progress</h1>
          <p>{completed} Finished</p>
          <p>{total} In progress</p>
        </div>
      </div>
      <div>
        <ProgressCircle total={total} completed={completed} />
      </div>
    </div>
  )
}

TodoCounter.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
}

export { TodoCounter }
