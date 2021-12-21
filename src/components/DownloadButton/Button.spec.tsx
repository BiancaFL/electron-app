import { render } from '@testing-library/react'
import { DownloadButton } from './index'

test('button should renders', () => {
  const { getByText } = render(<DownloadButton>ButtonContent</DownloadButton>)

  expect(getByText('ButtonContent')).toBeTruthy()
  expect(getByText('ButtonContent')).toHaveAttribute('type', 'button')
})
