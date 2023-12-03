import { render, screen } from '@testing-library/react'
import Test from '../app/Test/page'
import '@testing-library/jest-dom'

 
describe('Test', () => {
  it('renders a heading', () => {
    render(<Test />)
 
    const heading = screen.getByRole('heading')
 
    expect(heading).toBeInTheDocument()
  })
})