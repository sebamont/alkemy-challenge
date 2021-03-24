import React from 'react'

import {VStack, Heading, Box, Wrap, Flex, Divider, WrapItem, Text} from '@chakra-ui/react';

import MovementsTable from './MovementsTable';

const BalanceResume = ({colorMode}) => {

    return(
        <VStack spacing={4}>

            <BalanceSection colorMode={colorMode} />
            
            <MovementsTableSection colorMode={colorMode} />



        </VStack>
    )
}

export default BalanceResume;

const BalanceSection = ({colorMode}) => {
    return(
        <>
            <Heading as="h3" size="lg" color={colorMode==="light"?"gray.600":"gray.400"} >
                Balance
            </Heading>
            <Wrap justify="space-around" w="100%" align="center">
                <WrapItem>
                    <ResumeBox colorMode={colorMode}>
                        <Text fontSize="2xl">Saldo: $1.000,00</Text>
                    </ResumeBox>
                </WrapItem>
                <WrapItem >
                    <Flex justify="center">
                        <ResumeBox colorMode={colorMode}>
                            <Text>Ingresos: $2.000,00 </Text>
                            <Divider orientation="vertical" mx="5" sx={{
                                width: "2px",
                                backgroundColor: colorMode === "light" ? "black" : "white",
                                border: "none"
                            }}/>
                            <Text>Egresos: -$.1000,00</Text></ResumeBox>
                    </Flex>
                </WrapItem>
            </Wrap>
            <Divider mb="2" sx={{
                height: "4px",
                backgroundColor: colorMode === "light" ? "black" : "white",
                border: "none"
            }}/>
        </>
    )
}

const ResumeBox = ({colorMode, children}) => {
    return(
        <Box minH="40px"  bg={colorMode==="light"?"white":"teal.800"} p="4" boxShadow="md" borderRadius="md" textAlign="center" d="flex" alignItems="center" >
            {children}
        </Box>
    )
}

const MovementsTableSection = ({colorMode}) => {
    return(
        <>
            <Heading as="h3" size="md" color={colorMode==="light"?"gray.600":"gray.400"} textAlign="center">
                Ultimos 10 movimientos
            </Heading>
            <MovementsTable colorMode={colorMode}/>
        </>
    )

}