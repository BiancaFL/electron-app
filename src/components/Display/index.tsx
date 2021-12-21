import { Container } from './styles'
import { useState, useEffect } from 'react'
import { Config } from '../Config';
import { GenerateDRE } from '../GenerateDRE';

export function Display(props) {
    const screen = props.screen;

    return (
      <Container>
          { screen == "Config" ? <Config /> : <GenerateDRE />}
      </Container>
    
  )
}