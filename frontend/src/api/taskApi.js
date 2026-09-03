const BASE_URL = 'http://127.0.0.1:8000/api/tasks'

async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    const error = new Error(errorBody?.message || 'Something went wrong')
    error.status = response.status
    error.errors = errorBody?.errors
    throw error
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export async function getTasks() {
  const response = await fetch(BASE_URL)
  return handleResponse(response)
}

export async function createTask(taskData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })
  return handleResponse(response)
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })
  return handleResponse(response)
}

export async function completeTask(id) {
  const response = await fetch(`${BASE_URL}/${id}/complete`, {
    method: 'PATCH',
  })
  return handleResponse(response)
}

export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}