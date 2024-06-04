import React from 'react'
import styles from './styles.module.css'
import { ProgressCircle } from './ProgressCircle'

interface TodoCounterProps {
  total: number;
  completed: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ total, completed }) => {
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

export { TodoCounter }
