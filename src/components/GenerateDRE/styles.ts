import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  border-radius: 15px;
  margin: 0px;
  color: ${colors.grey};
  padding-left: 20px;
  
  div {
    width: 300px;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 10px;
    padding-left: 10px;

  }

  button {
    margin-top: 10px;
    outline: none;
    width: 300px;
  }

  select {
    width: 300px;
    height: 40px;
    border-radius: 8px;
    padding-left: 20px;
    outline: none;
    border: 1px dashed ${colors.grey};
  }

  #logo { 
    width: 100%;
    padding: 0px;
    display: flex;
    align-items: left;
    margin: 0px;
    
    img {
      width: 200px;
      margin-bottom: 100px;
    }
  }
`