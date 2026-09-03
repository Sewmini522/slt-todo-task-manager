import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  test('renders title and description fields with an Add button', () => {
    render(<TaskForm editingTask={null} onSubmit={() => {}} onCancelEdit={() => {}} />)

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  test('shows an error and does not submit when title is empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TaskForm editingTask={null} onSubmit={onSubmit} onCancelEdit={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Title is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('submits the entered title and description', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TaskForm editingTask={null} onSubmit={onSubmit} onCancelEdit={() => {}} />)

    await user.type(screen.getByLabelText('Title'), 'Buy books')
    await user.type(screen.getByLabelText('Description'), 'For next school year')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Buy books',
      description: 'For next school year',
    })
  })

  test('pre-fills the form and shows Update/Cancel when editing', () => {
    const task = { id: 1, title: 'Existing task', description: 'Existing description' }

    render(<TaskForm editingTask={task} onSubmit={() => {}} onCancelEdit={() => {}} />)

    expect(screen.getByLabelText('Title')).toHaveValue('Existing task')
    expect(screen.getByLabelText('Description')).toHaveValue('Existing description')
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })
})