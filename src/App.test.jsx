// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Todo app', () => {
    it('adds, completes, and deletes tasks while showing the total count', async () => {
        const user = userEvent.setup()
        render(<App />)

        expect(screen.getByText(/total tasks: 0/i)).toBeInTheDocument()

        await user.type(screen.getByLabelText(/new task/i), 'Buy milk')
        await user.click(screen.getByRole('button', { name: /add task/i }))

        expect(screen.getByText('Buy milk')).toBeInTheDocument()
        expect(screen.getByText(/total tasks: 1/i)).toBeInTheDocument()

        await user.click(screen.getByRole('checkbox'))
        expect(screen.getByText(/completed/i)).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: /delete/i }))
        expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
        expect(screen.getByText(/total tasks: 0/i)).toBeInTheDocument()
    })
})
