import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders bites title', () => {
  render(<App />)
  screen.getByText('Bites 😋')
})
