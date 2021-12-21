import { ReactNode, ButtonHTMLAttributes } from 'react'
import icon from '../../../assets/delete.png'

import { Container } from './styles'

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton (props: ButtonProps) {
  return <Container type="button" {...props}>
    <img src={icon} alt="delete icon"/>
  </Container>
}
