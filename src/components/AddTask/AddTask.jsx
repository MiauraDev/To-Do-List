import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

function AddTask({ onAdd }) {
  const [showInput, setShowInput] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('')
  const ContainerRef = useRef(null)

  const handleAddClick = () => {
    setShowInput(true)
  }

  const handleInputChange = (event) => {
    setNewTask(event.target.value)
  }

  const handlePriorityChange = (event) => {
    setPriority(event.target.value)
  }

  const handleAddTask = () => {
    if (newTask.trim() && priority) {
      onAdd(newTask, priority)
      setNewTask('')
      setPriority('')
      setShowInput(false)
    }
  }

  const handleClickOutside = (event) => {
    if (ContainerRef.current && !ContainerRef.current.contains(event.target)) {
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
        <div className={styles.Container} ref={ContainerRef}>
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

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export { AddTask }
