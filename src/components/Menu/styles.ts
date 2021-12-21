import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Container = styled.div`
  height: 100vh;
  width: auto;
  padding: 100px 0px 10px 0px;
  display: flex;
  background-color: ${colors.primary};
  flex-direction: column;
  align-items: left;
  justify-content: left;
  
  button {
    justify-content: left;
    width: 100%;
    padding-left: 20px;
    border-radius: 0px;
    padding-right: 30px;

    &:hover{ background-color: ${colors.pdark};}

  }
`

export const Image = styled.img`
  width: 200px;
  margin-bottom: 100px;
`

export const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`

