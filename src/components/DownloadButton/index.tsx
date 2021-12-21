import { ReactNode, ButtonHTMLAttributes } from 'react'
import icon from '../../../assets/download.png'

import { Container } from './styles'

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function DownloadButton (props: ButtonProps) {
  return <Container type="button" {...props}>
    <img src={icon} alt="upload icon"/>
  </Container>
}
