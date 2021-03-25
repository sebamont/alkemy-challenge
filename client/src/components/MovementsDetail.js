import React, {useContext, useEffect} from 'react'
import {VStack, Heading, Divider, Box, Text, Tr, Button, IconButton} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';

import MovementsTable, {TDTXT} from './containers/MovementsTable';
import ResumeBox from './containers/ResumeBox';
import {GlobalContext} from '../context/GlobalContext';

import {formatToAbsCurrency} from '../utils/formatter';

const MovementsDetail = ({colorMode}) => {
    const {error, loading, getMovements} = useContext(GlobalContext);

    useEffect(()=> {
        getMovements();
        //eslint-disable-next-line
    },[])

    if(loading) return <Box>Loading...</Box>
    if(error) return <Box>{error}</Box>

    return(
        <VStack spacing={4}>
            <Button alignSelf="flex-start" as={Link} to="/" variant="link" colorScheme="teal"> <FaArrowLeft />Volver al inicio</Button>
            <DetailHeaderSection colorMode={colorMode}/>
            <DetailMovementsSection colorMode={colorMode}/>
        </VStack>
    )
}

export default MovementsDetail;



const DetailHeaderSection = ({colorMode}) => {
    const {movements} = useContext(GlobalContext);

    let total = movements.reduce((a,b) =>({movementAmount: a.movementAmount + b.movementAmount}));
    const formattedTotal = formatToAbsCurrency(total.movementAmount);

    return(
        <>
            <Heading as="h3" size="lg" color={colorMode==="light"?"gray.600":"gray.400"} >
                Balance
            </Heading>
            <ResumeBox colorMode={colorMode}>
                <Text fontSize="2xl" color={total.movementAmount>0?colorMode==="light"?"teal":"teal.200":colorMode==="light"?"red":"red.200"}>Saldo: {total.movementAmount<0 && "-"} ${formattedTotal}</Text>
            </ResumeBox>
            <Divider mb="2" sx={{
                height: "4px",
                backgroundColor: colorMode === "light" ? "black" : "white",
                border: "none"
            }}/>
        </>
    )

}

const DetailMovementsSection = ({colorMode}) => {
    const {movements, deleteMovement, editMovement} = useContext(GlobalContext);

    movements.sort((a,b) => new Date(b.movementCreatedAt) - new Date(a.movementCreatedAt))

    const movementRows = movements.map((mov) => {
        return(
            <Tr key={mov._id}>
                <TDTXT>{new Date(mov.movementCreatedAt).toLocaleDateString()}</TDTXT>
                <TDTXT>{mov.movementDescription}</TDTXT>
                <TDTXT isNumeric>
                    {mov.movementAmount<0 && "-"}${formatToAbsCurrency(mov.movementAmount)}
                    
                </TDTXT>
            </Tr>
        )
    })

    return(
        <>
            <Heading as="h3" size="md" color={colorMode==="light"?"gray.600":"gray.400"} textAlign="center">
                Todos los Movimientos
            </Heading>
            <MovementsTable colorMode={colorMode} tCaption="Utilice los botones al final de cada fila para editar/eliminar movimientos">
                {movementRows}
            </MovementsTable>
        </>
    )

}