function TaskCard({ task, onEdit, onComplete, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-card-body">
        <div className="task-card-title-row">
          <h3>{task.title}</h3>
          <span className="badge">Active</span>
        </div>
        <p>{task.description}</p>
      </div>
      <div className="task-card-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onComplete(task.id)}>Done</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}

export default TaskCard