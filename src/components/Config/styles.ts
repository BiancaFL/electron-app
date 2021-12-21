import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: top;
  border-radius: 15px;
  margin: 0px;
  color: black;
  padding-left: 20px;

  > div > button {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  select {
    width: 200px;
    height: 50px;
    border-radius: 15px;
    padding-left: 20px;
    color: ${colors.grey};
  }

  ul {
    border: 1px dashed ${colors.grey};
    border-radius: 8px;
  }

  li:nth-child(even) {background-color: ${colors.lightGrey}; }
  li:last-child { border-radius: 0 0 8px 8px; }
  li:hover {
    background-color: ${colors.mediumGrey};
  }

  div { 
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
