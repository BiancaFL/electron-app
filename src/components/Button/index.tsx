import { ReactNode, ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props) {
  return <Container type="button" {...props} />
}
