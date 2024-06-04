import React, { ReactNode } from 'react'
import styles from './styles.module.css'

interface TodoListProps {
  children: ReactNode;
}

const TodoList: React.FC<TodoListProps> = ({ children }) => {
  return <ul className={styles.TodoList}>{children}</ul>
}

export { TodoList }
