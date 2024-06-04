import React from 'react'
import styles from './styles.module.css'

interface TodoItemProps {
  text: string
  completed: boolean
  priority: 'Urgente' | 'Importante' | 'No urgente'
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
    if (priority === 'Urgente') return styles.Urgent
    if (priority === 'Importante') return styles.Important
    if (priority === 'No urgente') return styles.NotUrgent
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
