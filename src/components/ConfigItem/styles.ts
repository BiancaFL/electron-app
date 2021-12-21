import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Container = styled.li`
  height: 50px;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  border: none;
  margin: 0px;
  color: ${colors.darkGrey};
  padding-right: 20px;

  button {
    margin-top: 0px;
    margin-right: 3px;
  }

  div {
    height: 100%;
    width: 1;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 10px;
   
  }
`

