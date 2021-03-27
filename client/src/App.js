import React from 'react'
import {VStack, useColorMode} from '@chakra-ui/react';
import {Switch, Route, useLocation} from "react-router-dom";  

import BalanceResume from './components/BalanceResume';
import FooterBar from './components/Footer';
import HeadingComp from './components/Heading';
import MainContainer from './components/containers/mainContainer';
import MovementsDetail from './components/MovementsDetail';
import Statistics from './components/Statistics';

import {GlobalProvider} from './context/GlobalContext';

import './App.css';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  return (
    <GlobalProvider>
      <VStack>
        <HeadingComp />
        <MainContainer colorMode={colorMode}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <BalanceResume colorMode={colorMode}/>
            </Route>
            <Route exact path="/all">
              <MovementsDetail colorMode={colorMode}/>
            </Route>
            <Route exact path="/stats">
              <Statistics colorMode={colorMode}/>
            </Route>
          </Switch>
        </MainContainer>
        <FooterBar colorMode={colorMode} toggleColorMode={toggleColorMode}/>
      </VStack>
    </GlobalProvider>
  );
}

export default App;
