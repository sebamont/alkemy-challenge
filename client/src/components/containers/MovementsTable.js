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


const MovementsTable = ({colorMode, children, tCaption}) => {
    return(
        <Table variant="striped" size="sm" colorScheme={colorMode==="light"?"gray":"teal"}>
            <TableCaption placement="top">Para agregar un movimiento utilice el botón <Text as="span" fontWeight="extrabold" fontSize="20px" >+</Text> en el panel inferior</TableCaption>
            <TableCaption>{tCaption}</TableCaption>
            <Thead>
                <Tr>
                    <THTXT>Fecha</THTXT>
                    <THTXT>Detalle</THTXT>
                    <THTXT isNumeric>Monto</THTXT>
                </Tr>
            </Thead>
            <Tbody>
                {children}
            </Tbody>
        </Table>
    )
}


const THTXT = ({children, isNumeric}) => {
    return(
        <Th isNumeric={isNumeric?"true":"false"}><TTXT>{children}</TTXT></Th> 
        )
    }
    
export const TDTXT = ({children, isNumeric}) => {
    return(
    <Td isNumeric={isNumeric?"true":"false"}><TTXT>{children}</TTXT></Td> 
    )
}


const TTXT = ({children}) => {
    return(
        <Text fontSize={{base:"xs", md:"md", "2xl":"lg"}}>{children}</Text>
        )
    }
export default MovementsTable;