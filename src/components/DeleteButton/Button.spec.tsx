import { render } from '@testing-library/react'
import { DeleteButton } from './index'

test('button should renders', () => {
  const { getByText } = render(<DeleteButton>ButtonContent</DeleteButton>)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
