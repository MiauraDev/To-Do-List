import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Confetti from 'react-confetti'

import './App.css'
import { TodoCounter } from './components/TodoCounter/TodoCounter'
import { TodoSearch } from './components/TodoSearch/TodoSearch'
import { TodoItem } from './components/TodoItem/TodoItem'
import { TodoList } from './components/TodoList/TodoList'
import { AddTask } from './components/AddTask/AddTask'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Filters } from './components/Filters/Filters'

const defaultTodos = [
  { id: 1, Text: 'MY', completed: false, priority: 'Urgente' },
  { id: 2, Text: 'TO-DO', completed: true, priority: 'Importante' },
  { id: 3, Text: 'LIST', completed: false, priority: 'No urgente' },
]

const getSavedTodos = () => {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : defaultTodos
}

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [todos, setTodos] = useState(getSavedTodos)
  const [filter, setFilter] = useState(null)
  const [isAsc, setIsAsc] = useState(true)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  )
  const totalTodos = useMemo(() => todos.length, [todos])

  const searchedTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.Text.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [todos, searchValue])

  useEffect(() => {
    if (completedTodos === totalTodos && totalTodos !== 0) {
      setShowConfetti(true)
      const audio = new Audio('/sounds/celebration.mp3')
      audio.play()
      setTimeout(() => {
        setShowConfetti(false)
        setTodos([])
      }, 4000)
    } else {
      setShowConfetti(false)
    }
  }, [completedTodos, totalTodos])

  const completeTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const addTodo = useCallback((text, priority) => {
    setTodos((prevTodos) => [
      {
        id: prevTodos.length + 1,
        Text: text,
        completed: false,
        priority: priority,
      },
      ...prevTodos,
    ])
  }, [])

  const handleFilter = useCallback(
    (criteria) => {
      if (filter === criteria) {
        setIsAsc((prevIsAsc) => !prevIsAsc)
      } else {
        setFilter(criteria)
        setIsAsc(true)
      }
    },
    [filter]
  )

  const sortedTodos = useMemo(() => {
    const priorities = { Urgente: 1, Importante: 2, 'No urgente': 3 }
    return [...searchedTodos].sort((a, b) => {
      if (filter === 'alphabet') {
        return isAsc
          ? a.Text.localeCompare(b.Text)
          : b.Text.localeCompare(a.Text)
      }
      if (filter === 'creation') {
        return isAsc ? a.id - b.id : b.id - a.id
      }
      if (filter === 'priority') {
        return isAsc
          ? priorities[a.priority] - priorities[b.priority]
          : priorities[b.priority] - priorities[a.priority]
      }
      return 0
    })
  }, [searchedTodos, filter, isAsc])

  return (
    <>
      <div className="app-container">
        <Header />
        <div className="app-content">
          <div>
            <div className="content-search-filter">
              <TodoSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <Filters
                onFilterAlphabet={() => handleFilter('alphabet')}
                onFilterCreation={() => handleFilter('creation')}
                onFilterPriority={() => handleFilter('priority')}
              />
            </div>
            <TodoList>
              {sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.Text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  priority={todo.priority}
                  className="content-TodoItem"
                />
              ))}
            </TodoList>
          </div>
          <div className="content-right">
            <TodoCounter completed={completedTodos} total={totalTodos} />
            <AddTask onAdd={addTodo} />
          </div>
        </div>
      </div>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Footer />
    </>
  )
}

export default App
