import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import TaskCard from './TaskCard'

const sampleTask = { id: 1, title: 'Buy books', description: 'For next school year' }

describe('TaskCard', () => {
  test('renders the task title and description', () => {
    render(<TaskCard task={sampleTask} onEdit={() => {}} onComplete={() => {}} onDelete={() => {}} />)

    expect(screen.getByText('Buy books')).toBeInTheDocument()
    expect(screen.getByText('For next school year')).toBeInTheDocument()
  })

  test('calls onEdit with the task when Edit is clicked', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(<TaskCard task={sampleTask} onEdit={onEdit} onComplete={() => {}} onDelete={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'Edit' }))

    expect(onEdit).toHaveBeenCalledWith(sampleTask)
  })

  test('calls onComplete with the task id when Done is clicked', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()

    render(<TaskCard task={sampleTask} onEdit={() => {}} onComplete={onComplete} onDelete={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'Done' }))

    expect(onComplete).toHaveBeenCalledWith(1)
  })

  test('calls onDelete with the task id when Delete is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()

    render(<TaskCard task={sampleTask} onEdit={() => {}} onComplete={() => {}} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})