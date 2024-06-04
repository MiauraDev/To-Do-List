import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import styles from './styles.module.css'

interface AddTaskProps {
  onAdd: (
    newTask: string,
    priority: 'Urgente' | 'Importante' | 'No urgente'
  ) => void
}

function AddTask({ onAdd }: AddTaskProps) {
  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [newTask, setNewTask] = useState<string>('')
  const [priority, setPriority] = useState<
    'Urgente' | 'Importante' | 'No urgente' | ''
  >('')
  const containerRef = useRef<HTMLDivElement>(null)
  const handleAddClick = () => {
    setShowInput(true)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }

  const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value as 'Urgente' | 'Importante' | 'No urgente')
  }

  const handleAddTask = () => {
    if (newTask.trim() && priority) {
      onAdd(newTask, priority)
      setNewTask('')
      setPriority('')
      setShowInput(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowInput(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.AddTaskContainer}>
      <button onClick={handleAddClick} className={styles.AddTask}></button>
      {showInput && (
        <div className={styles.Container} ref={containerRef}>
          <div className={styles.InputContainer}>
            <input
              type="text"
              value={newTask}
              onChange={handleInputChange}
              placeholder="Enter new task..."
              className={styles.TaskInput}
            />
            <button onClick={handleAddTask} className={styles.NewTask}></button>
          </div>
          <div className={styles.PriorityContainer}>
            <p>Prioridad:</p>
            <div className={styles.Priority}>
              <label className={styles.PriorityLabel}>
                <input
                  type="radio"
                  name="priority"
                  value="Urgente"
                  checked={priority === 'Urgente'}
                  onChange={handlePriorityChange}
                  className={styles.Urgent}
                />
                Urgente
              </label>
              <label className={styles.PriorityLabel}>
                <input
                  type="radio"
                  name="priority"
                  value="Importante"
                  checked={priority === 'Importante'}
                  onChange={handlePriorityChange}
                  className={styles.Important}
                />
                Importante
              </label>
              <label className={styles.PriorityLabel}>
                <input
                  type="radio"
                  name="priority"
                  value="No urgente"
                  checked={priority === 'No urgente'}
                  onChange={handlePriorityChange}
                  className={styles.NotUrgent}
                />
                No urgente
              </label>
            </div>
          </div>
        </div>
      )}
      <p>Add a new Task</p>
    </div>
  )
}

export { AddTask }
