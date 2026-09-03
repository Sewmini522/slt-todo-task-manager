import { useState, useEffect } from 'react'

function TaskForm({ editingTask, onSubmit, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingTask])

  function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    setError('')
    onSubmit({ title, description })

    if (!editingTask) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editingTask ? 'Edit Task' : 'Add a Task'}</h2>

      {error && <p className="error-message">{error}</p>}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="task-form-actions">
        <button type="submit">{editingTask ? 'Update' : 'Add'}</button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm