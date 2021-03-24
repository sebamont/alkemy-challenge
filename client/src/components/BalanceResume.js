import React, {useContext, useEffect} from 'react'

import {VStack, Heading, Box, Wrap, Flex, Divider, WrapItem, Text} from '@chakra-ui/react';

import MovementsTable from './MovementsTable';

import {GlobalContext} from '../context/GlobalContext';

import {formatToAbsCurrency} from '../utils/formatter';

const BalanceResume = ({colorMode}) => {

    const {movements, error, loading, getMovements} = useContext(GlobalContext);

    useEffect(()=> {
        getMovements();
        //eslint-disable-next-line
    },[])

    if(loading) return <Box>Loading...</Box>
    if(error) return <Box>{error}</Box>

    return(
        <VStack spacing={4}>
            {console.log(movements)}

            <BalanceSection colorMode={colorMode} />
            
            <MovementsTableSection colorMode={colorMode} />



        </VStack>
    )
}

export default BalanceResume;

const BalanceSection = ({colorMode}) => {
    const {movements} = useContext(GlobalContext);

    let total = movements.reduce((a,b) =>({movementAmount: a.movementAmount + b.movementAmount}));
    let incomesTotal = movements.filter((mov) => mov.movementAmount > 0).reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount}));
    let outcomesTotal = movements.filter((mov) => mov.movementAmount < 0).reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount}));

    const formattedTotal = formatToAbsCurrency(total.movementAmount);
    const formattedincomes = formatToAbsCurrency(incomesTotal.movementAmount);
    const formattedOutcomes = formatToAbsCurrency(outcomesTotal.movementAmount);

    return(
        <>
            <Heading as="h3" size="lg" color={colorMode==="light"?"gray.600":"gray.400"} >
                Balance
            </Heading>
            <Wrap justify="space-around" w="100%" align="center">
                <WrapItem>
                    <ResumeBox colorMode={colorMode}>
                        <Text fontSize="2xl" color={total.movementAmount>0?colorMode==="light"?"teal":"teal.200":colorMode==="light"?"red":"red.200"}>Saldo: {total.movementAmount<0 && "-"} ${formattedTotal}</Text>
                    </ResumeBox>
                </WrapItem>
                <WrapItem >
                    <Flex justify="center">
                        <ResumeBox colorMode={colorMode}>
                            <Text color={colorMode==="light" ? "teal" : "teal.200"}>Ingresos: ${formattedincomes} </Text>
                            <Divider orientation="vertical" mx="5" sx={{
                                width: "2px",
                                backgroundColor: colorMode === "light" ? "black" : "white",
                                border: "none"
                            }}/>
                            <Text color={colorMode==="light" ? "red":"red.200"}>Egresos: -${formattedOutcomes}</Text></ResumeBox>
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