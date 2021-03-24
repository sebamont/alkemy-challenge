import React, {useContext} from 'react';

import {GlobalContext} from '../context/GlobalContext';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Text
  } from "@chakra-ui/react";

import {formatToAbsCurrency} from '../utils/formatter';

const MovementsTable = ({colorMode}) => {

    const {movements} = useContext(GlobalContext);

    const movementsCount = movements.length;
    let maxRows = 10;
    if (movementsCount<maxRows){
        maxRows=movementsCount;
    }

    //sorted by date: from newest to Oldest
    movements.sort((a,b) => new Date(b.movementCreatedAt) - new Date(a.movementCreatedAt))


    //return only the first 10 rows
    //toLocaleDateString() turns date into "dd/mm/yyyy"
    //minus sign is added through conditional rendering if mov.movementAmount < 0;
    const movementRows = movements.slice(0,maxRows).map((mov) => {
        return(
            <Tr>
                <TDTXT>{new Date(mov.movementCreatedAt).toLocaleDateString()}</TDTXT>
                <TDTXT>{mov.movementDescription}</TDTXT>
                <TDTXT isNumeric>{mov.movementAmount<0 && "-"}${formatToAbsCurrency(mov.movementAmount)}</TDTXT>
            </Tr>
        )
    })

    return(
        <Table variant="striped" size="sm" colorScheme={colorMode==="light"?"gray":"teal"}>
            <TableCaption placement="top">Para agregar un movimiento utilice el botón <strong>+</strong> en el panel inferior</TableCaption>
            <TableCaption>Ver/editar todos los movimientos...</TableCaption>
            <Thead>
                <Tr>
                    <THTXT>Fecha</THTXT>
                    <THTXT>Detalle</THTXT>
                    <THTXT isNumeric>Monto</THTXT>
                </Tr>
            </Thead>
            <Tbody>
                {movementRows}
            </Tbody>
        </Table>
    )
}

export default MovementsTable;

const THTXT = ({children, isNumeric}) => {
    return(
        <Th isNumeric={isNumeric?"true":"false"}><TTXT>{children}</TTXT></Th> 
    )
}
const TDTXT = ({children, isNumeric}) => {
    return(
        <Td isNumeric={isNumeric?"true":"false"}><TTXT>{children}</TTXT></Td> 
    )
}


const TTXT = ({children}) => {
    return(
        <Text fontSize={{base:"xs", md:"md", "2xl":"lg"}}>{children}</Text>
    )
}