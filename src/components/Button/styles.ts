import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Container = styled.button`
  height: 42px;
  padding: 0 10px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${colors.secondary};
  border-radius: 8px;
  border: 0;

  color: #FFF;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif !important;

  cursor: pointer;
  background-color: ${props => props.selected ? colors.pdark : colors.primary};

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

  img {
    margin-right: 10px;
  }
  
`
