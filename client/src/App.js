import React from 'react'

import HeadingComp from './components/Heading';
import FooterBar from './components/Footer';
import MainContainer from './components/container/mainContainer';
import BalanceResume from './components/BalanceResume';

import {GlobalProvider} from './context/GlobalContext';

import './App.css';
import {VStack, useColorMode} from '@chakra-ui/react';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  

  return (
    <GlobalProvider>
      <VStack>
        <HeadingComp />
        <MainContainer colorMode={colorMode}>
          <BalanceResume colorMode={colorMode}/>
        </MainContainer>
        <FooterBar colorMode={colorMode} toggleColorMode={toggleColorMode}/>
      </VStack>
    </GlobalProvider>
  );
}

export default App;
