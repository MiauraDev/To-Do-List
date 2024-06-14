import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import styles from './styles.module.css'

interface Todo {
  id: number
  Text: string
  completed: boolean
  priority: 'Urgente' | 'Importante' | 'No urgente'
}

interface AddTaskProps {
  onAdd: (
    newTask: string,
    priority: 'Urgente' | 'Importante' | 'No urgente'
  ) => void
  todos: Todo[]
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, todos }) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [newTask, setNewTask] = useState<string>('')
  const [priority, setPriority] = useState<
    'Urgente' | 'Importante' | 'No urgente' | ''
  >('')
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAddClick = () => {
    setShowInput(true)
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(event.target.value)
    autoResizeTextarea(event.target)
  }

  const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 40)
      textarea.style.height = `${newHeight}px`
      adjustContainerHeight(newHeight)
    }
  }

  const adjustContainerHeight = (textareaHeight: number) => {
    if (containerRef.current) {
      containerRef.current.style.maxHeight = `${textareaHeight + 130}px`
    }
  }

  const handlePriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value as 'Urgente' | 'Importante' | 'No urgente')
  }

  const handleAddTask = () => {
    const taskExists = todos.some(
      (todo) => todo.Text?.toLowerCase() === newTask.toLowerCase()
    )

    if (taskExists) {
      alert('¡La tarea ya existe!')
      return
    }

    if (!newTask.trim() || !priority) {
      alert('Completa nombre y prioridad de tu tarea...')
      return
    }

    onAdd(newTask, priority)
    setNewTask('')
    setPriority('')
    setShowInput(false)
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

  useEffect(() => {
    const elmnt = containerRef.current
    if (!elmnt) return

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0

    const header = document.getElementById(elmnt.id + 'header')
    if (header) {
      header.onmousedown = dragMouseDown
    } else {
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault()
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault()
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      if (elmnt) {
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
      }
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }

    return () => {
      if (header) {
        header.onmousedown = null
      } else {
        elmnt.onmousedown = null
      }
      document.onmouseup = null
      document.onmousemove = null
    }
  }, [showInput])

  return (
    <div className={styles.AddTaskContainer} onClick={handleAddClick}>
      <button className={styles.AddTask}></button>
      {showInput && (
        <div className={`${styles.Container}`} ref={containerRef} id="mydiv">
          <div id="mydivheader" className={styles.mydivheader}></div>
          <div className={styles.InputContainer}>
            <textarea
              ref={textareaRef}
              value={newTask}
              onChange={handleInputChange}
              placeholder="Enter new task..."
              className={styles.TaskInput}
              maxLength={108}
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
