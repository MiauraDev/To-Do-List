import React from 'react'
import styles from './styles.module.css'

interface TodoItemProps {
  text: string
  completed: boolean
  priority: 'Urgent' | 'Important' | 'Not urgent'
  onComplete: () => void
  onDelete: () => void
  className?: string
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  onComplete,
  onDelete,
  priority,
  className,
}: TodoItemProps) => {
  const getPriorityClass = (): string => {
    if (priority === 'Urgent') return styles.Urgent
    if (priority === 'Important') return styles.Important
    if (priority === 'Not urgent') return styles.NotUrgent
    return ''
  }

  return (
    <li className={`${styles.TodoItemContainer} ${className}`}>
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
          backgroundImage: `url(${
            completed ? '/icons/sicheck.svg' : '/icons/nocheck.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </li>
  )
}

export { TodoItem }
