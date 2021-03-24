import React from 'react'

import {Box} from '@chakra-ui/react';

const MainContainer = ({colorMode, children}) => {
    return(
        <Box maxH={{base:"50vh", "2xl":"65vh"}} w="90%" overflowY="scroll" bg={colorMode==="light" ? "gray.200" : "gray.700"}  boxShadow="xl" borderRadius="xl"
          sx={{
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-track': {
              width: '14px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colorMode==="light" ? "gray.400" : "gray.600",
              borderRadius: '5px',
            },
          }}>
            <Box minH={{base:"50vh", "2xl":"65vh"}} p={{base:4, "2xl":10}}>
                {children}
            </Box>
        </Box>
    )
}

export default MainContainer;