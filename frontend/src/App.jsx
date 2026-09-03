import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { getTasks, createTask, updateTask, completeTask, deleteTask } from './api/taskApi'

function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    try {
      setIsLoading(true)
      setError('')
      const result = await getTasks()
      setTasks(result.data)
    } catch (err) {
      setError('Could not load tasks. Please check that the backend server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(taskData) {
    try {
      setError('')
      if (editingTask) {
        await updateTask(editingTask.id, taskData)
        setEditingTask(null)
      } else {
        await createTask(taskData)
      }
      await loadTasks()
    } catch (err) {
      setError(err.message || 'Something went wrong while saving the task.')
    }
  }

  async function handleComplete(id) {
    try {
      setError('')
      await completeTask(id)
      await loadTasks()
    } catch (err) {
      setError('Could not mark the task as complete.')
    }
  }

  async function handleDelete(id) {
    try {
      setError('')
      await deleteTask(id)
      await loadTasks()
    } catch (err) {
      setError('Could not delete the task.')
    }
  }

  function handleEdit(task) {
    setEditingTask(task)
  }

  function handleCancelEdit() {
    setEditingTask(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do Task Manager</h1>
        <p>Showing your 5 most recent active tasks</p>
      </header>

      {error && <p className="error-message">{error}</p>}

      <TaskForm
        editingTask={editingTask}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <div className="task-list-header">
        <h2>Active Tasks</h2>
      </div>

      {isLoading ? (
        <p className="loading-state">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App