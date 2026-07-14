import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')

  const addTodo = (event) => {
    event.preventDefault()

    const trimmedTask = task.trim()
    if (!trimmedTask) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text: trimmedTask, completed: false },
    ])
    setTask('')
  }

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="todo-app">
      <section className="todo-card">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Productivity</p>
            <h1>Todo list</h1>
          </div>
          <p className="summary">Total tasks: {todos.length}</p>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <label htmlFor="new-task">New task</label>
          <div className="form-row">
            <input
              id="new-task"
              name="task"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="What needs doing?"
            />
            <button type="submit">Add task</button>
          </div>
        </form>

        <div className="todo-status" aria-live="polite">
          <span>{completedCount} completed</span>
          <span>{todos.length - completedCount} active</span>
        </div>

        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <label className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
