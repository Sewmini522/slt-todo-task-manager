import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import TaskList from './TaskList'

const tasks = [
  { id: 1, title: 'Task one', description: 'First task' },
  { id: 2, title: 'Task two', description: 'Second task' },
]

describe('TaskList', () => {
  test('shows the empty state message when there are no tasks', () => {
    render(<TaskList tasks={[]} onEdit={() => {}} onComplete={() => {}} onDelete={() => {}} />)

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  test('renders one card per task', () => {
    render(<TaskList tasks={tasks} onEdit={() => {}} onComplete={() => {}} onDelete={vi.fn()} />)

    expect(screen.getByText('Task one')).toBeInTheDocument()
    expect(screen.getByText('Task two')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(2)
  })
})