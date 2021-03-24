import React from 'react';

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

const MovementsTable = ({colorMode}) => {
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
                <Tr>
                    <TDTXT>28/10/21</TDTXT>
                    <TDTXT>Monthly Income</TDTXT>
                    <TDTXT isNumeric>$1.100,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>31/12/21</TDTXT>
                    <TDTXT>Disney+</TDTXT>
                    <TDTXT isNumeric>-$500,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
                <Tr>
                    <TDTXT>03/03/20</TDTXT>
                    <TDTXT>Honorarios Freelance</TDTXT>
                    <TDTXT isNumeric>$400,00</TDTXT>
                </Tr>
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