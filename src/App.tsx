import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import {  Routes} from 'react-router-dom';
import {
  HashRouter,
  Route
} from "react-router-dom";
import { useState } from 'react'
//import Routes from '../src/routes'
import history from './history';
import { Menu } from './components/Menu';
import { Display } from './components/Display';
import { Container } from './styles/GlobalStyle'

export function App() {
  const [screen, setScreen] = useState("DRE");

  function handleScreenChange(newScreen) {
    setScreen(newScreen);
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Menu selectedScreen={screen} handleScreenChange={handleScreenChange}/>
        <Display screen={screen}/>
      </Container>
    </>
  );
}