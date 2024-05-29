import React, { useState } from 'react'
import './App.css'
import { TodoCounter } from './components/TodoCounter/TodoCounter'
import { TodoSearch } from './components/TodoSearch/TodoSearch'
import { TodoItem } from './components/TodoItem/TodoItem'
import { TodoList } from './components/TodoList/TodoList'
import { CreateTodoButton } from './components/AddTask/AddTask'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

const defaultTodos = [
  { id: 1, Text: 'Arriba', completed: true },
  { id: 2, Text: 'Abajo', completed: true },
  { id: 3, Text: 'Estudiar', completed: false },
  { id: 4, Text: 'Estudiar', completed: false },
  { id: 5, Text: 'Estudiar', completed: false },
  { id: 6, Text: 'Estudiar', completed: false }
]

function App () {
  const [todos, setTodos] = useState(defaultTodos)

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <>
      <div className='app-container'>
        <Header />
        <div className='app-content'>
          <div>
            <TodoSearch />
            <TodoList>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.Text}
                  completed={todo.completed}
                  onToggle={() => handleToggle(todo.id)}
                />
              ))}
            </TodoList>
          </div>
          <div className='content-right'>
            <TodoCounter
              completed={todos.filter((todo) => todo.completed).length}
              total={todos.length}
            />
            <CreateTodoButton />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
