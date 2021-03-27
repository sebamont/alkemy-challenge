import React, {useContext, useEffect} from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend} from 'recharts';
import {VStack, Wrap, WrapItem, Heading, Divider, Box, Button, Spinner} from '@chakra-ui/react'; 
import { Link } from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';

import {GlobalContext} from '../context/GlobalContext';

const colores = {
    //totals
    teal600: "#2C7A7B", //total incomes light
    teal400: "#38B2AC", // total incomes dark
    red600: "#C53030", // total outcomes light
    red400: "#F56565", // total outcomes dark
    gray400: "#A0AEC0", // total savings light/dark
    
    //incomes
    green600: "#2F855A", // sueldo/salario light
    green400: "#48BB78",// sueldo/salario dark
    blue600: "#2B6CB0", // otros ingresos light
    blue400: "#4299E1", // otros ingresos dark
    //outcomes
    cyan600: "#00A3C4", // alquiler light
    cyan400: "#0BC5EA", // alquiler dark
    purple600: "#6B46C1", // expensas y ss light
    purple400: "#9F7AEA", // expensas y ss dark
    pink600: "#B83280", // mercaderia light
    pink400: "#ED64A6", // mercaderia dark
    red800: "#822727", // ocio y recreacion light
    red200: "#FEB2B2", // ocio y recreacion dark
    orange600: "#C05621", // bienes durables light
    orange400: "#ED8936", // bienes durables dark
    yellow600: "#B7791F", // otros gastos light
    yellow400: "#ECC94B", // otros gastos dark

}

const Statistics = ({colorMode}) => {

    const { movements, getMovements, loading, error } = useContext(GlobalContext);

    useEffect(()=> {
        getMovements();
        //eslint-disable-next-line
    },[])

    if(loading) return <Spinner size="xl" />
    if(error) return <Box>{error}</Box>

    return(
            <VStack spacing={4}>
                <Button alignSelf="flex-start" as={Link} to="/" variant="link" colorScheme="teal"> <FaArrowLeft />Volver al inicio</Button>
                <TotalsGraphicSection colorMode={colorMode} movements={movements}/>
                <IncomesGraphicSection colorMode={colorMode} movements={movements}/>
                <OutcomesGraphicSection colorMode={colorMode} movements={movements}/>
            </VStack>
    )
}

export default Statistics;


const TotalsGraphicSection = ({colorMode, movements}) => {

    let incomesTotal = 0, outcomesTotal = 0;

    if(movements.length>0){
        let incomesArray = movements.filter((mov) => mov.movementAmount > 0);
        let outcomesArray = movements.filter((mov) => mov.movementAmount < 0);
        if (incomesArray.length > 0){
            incomesTotal = incomesArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (outcomesArray.length > 0){
            outcomesTotal = outcomesArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }

    }

    const totalData = [
        {name:"Ingresos", "$": incomesTotal},
        {name:"Egresos", "$": Math.abs(outcomesTotal)}
    ]

    const savingData = [
        { name: "Ahorros", "$": incomesTotal+outcomesTotal},
        {name:"Egresos", "$": Math.abs(outcomesTotal)}
    ]
    return(
        <>
            <Heading textShadow="2px 2px teal" color={colorMode==="light"?"gray.700":"gray.300"}>TOTALES</Heading>
            <Wrap justify="center">
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Importe</Heading>
                        <BarChart width={220} height={250} data={totalData}>
                            <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                            <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                            <Tooltip contentStyle={{color: "black"}}/>
                            <Bar dataKey="$" isAnimationActive={false}>
                                <Cell fill={colorMode==="light" ? colores.teal600 : colores.teal400 } />
                                <Cell fill={colorMode==="light" ? colores.red600 : colores.red400 } />
                            </Bar>
                        </BarChart>
                    </VStack>
                </WrapItem>
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Porcentaje</Heading>
                        <PieChart width={220} height={250} >
                                <Legend />
                                <Tooltip />
                            <Pie dataKey="$" data={savingData} isAnimationActive={false} >
                                <Cell fill= {colores.gray400}/>
                                <Cell fill={colorMode==="light" ? colores.red600 : colores.red400 }  />
                            </Pie>
                        </PieChart>
                    </VStack>
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

const IncomesGraphicSection = ({colorMode, movements}) => {

    let sueldoTotal = 0, otrosIngresosTotal = 0;

    if(movements.length>0){
        const sueldoArray = movements.filter((mov)=> mov.movementCategory==="Sueldo/Salarios");
        const otrosIngresosArray = movements.filter((mov)=> mov.movementCategory==="Otros Ingresos");
        if (sueldoArray.length > 0){
            sueldoTotal = sueldoArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (otrosIngresosArray.length > 0){
            otrosIngresosTotal = otrosIngresosArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
    }

    const incomesData = [
        { name: "Sueldo/Salarios", "$":sueldoTotal},
        {name:"Otros Ingresos", "$": otrosIngresosTotal}
    ]
    return(
        <>
            <Heading textShadow="2px 2px teal" color={colorMode==="light"?"gray.700":"gray.300"}>INGRESOS</Heading>
            <Wrap justify="center">
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Importe</Heading>
                        <BarChart width={220} height={250} data={incomesData}>
                            <XAxis dataKey="name" stroke={colorMode==="light"?"white":"#1A202C"} />
                            <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                            <Tooltip contentStyle={{color: "black"}}/>
                            <Bar dataKey="$" isAnimationActive={false}>
                                <Cell fill={colorMode==="light" ? colores.green600 : colores.green400} />
                                <Cell fill={colorMode==="light" ? colores.blue600 : colores.blue400 } />
                            </Bar>
                        </BarChart>
                    </VStack>
                </WrapItem>
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Porcentaje</Heading>
                        <PieChart width={220} height={250} >
                                <Legend />
                                <Tooltip />
                            <Pie dataKey="$" data={incomesData} isAnimationActive={false} >
                                <Cell fill= {colorMode==="light" ? colores.green600 : colores.green400}/>
                                <Cell fill={colorMode==="light" ? colores.blue600 : colores.blue400 }  />
                            </Pie>
                        </PieChart>
                    </VStack>
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

const OutcomesGraphicSection = ({colorMode, movements}) => {
 //"Alquiler", "Expensas y Servicios Mensuales", "Mercadería", "Ocio y Recreación", "Bienes durables", "Otros gastos"

    let alquilerTotal = 0, expensasServiciosTotal = 0, mercaderiaTotal = 0, ocioRecreacionTotal = 0, bienesDurablesTotal = 0, otrosGastosTotal = 0;

    if(movements.length>0){
        const alquilerArray = movements.filter((mov)=> mov.movementCategory==="Alquiler");
        const expensasServiciosArray = movements.filter((mov)=> mov.movementCategory==="Expensas y Servicios Mensuales");
        const mercaderiaArray = movements.filter((mov)=> mov.movementCategory==="Mercadería");
        const ocioRecreacionArray = movements.filter((mov)=> mov.movementCategory==="Ocio y Recreación");
        const bienesDurablesArray = movements.filter((mov)=> mov.movementCategory==="Bienes durables");
        const otrosGastosArray = movements.filter((mov)=> mov.movementCategory==="Otros gastos");
        if (alquilerArray.length > 0){
            alquilerTotal = alquilerArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (expensasServiciosArray.length > 0){
            expensasServiciosTotal = expensasServiciosArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (mercaderiaArray.length > 0){
            mercaderiaTotal = mercaderiaArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (ocioRecreacionArray.length > 0){
            ocioRecreacionTotal = ocioRecreacionArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (bienesDurablesArray.length > 0){
            bienesDurablesTotal = bienesDurablesArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
        if (otrosGastosArray.length > 0){
            otrosGastosTotal = otrosGastosArray.reduce((a,b) => ({movementAmount: a.movementAmount + b.movementAmount})).movementAmount;
        }
    }


    const outcomesData = [
        { name: "Alquiler", "$":Math.abs(alquilerTotal)},
        {name:"Expensas y Servicios", "$": Math.abs(expensasServiciosTotal)},
        {name:"Mercadería", "$": Math.abs(mercaderiaTotal)},
        {name:"Ocio y Recreación", "$": Math.abs(ocioRecreacionTotal)},
        {name:"Bienes durables", "$": Math.abs(bienesDurablesTotal)},
        {name:"Otros gastos", "$": Math.abs(otrosGastosTotal)},
    ]
    return(
        <>
            <Heading textShadow="2px 2px teal" color={colorMode==="light"?"gray.700":"gray.300"}>EGRESOS</Heading>
            <Wrap justify="center">
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Importe</Heading>
                        <BarChart width={220} height={250}data={outcomesData}>
                            <XAxis dataKey="name" stroke={colorMode==="light"?"white":"#1A202C"} />
                            <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                            <Tooltip contentStyle={{color: "black"}}/>
                            <Bar dataKey="$" isAnimationActive={false}>
                                <Cell fill={colorMode==="light" ? colores.cyan600 : colores.cyan400} />
                                <Cell fill={colorMode==="light" ? colores.purple600 : colores.purple400 } />
                                <Cell fill={colorMode==="light" ? colores.pink600 : colores.pink400 } />
                                <Cell fill={colorMode==="light" ? colores.red800 : colores.red200 } />
                                <Cell fill={colorMode==="light" ? colores.orange600 : colores.orange400 } />
                                <Cell fill={colorMode==="light" ? colores.yellow600 : colores.yellow400 } />
                            </Bar>
                        </BarChart>
                    </VStack>
                </WrapItem>
                <WrapItem>
                    <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                        <Heading>Porcentaje</Heading>
                        <PieChart width={220} height={250} >
                                <Legend />
                                <Tooltip />
                            <Pie dataKey="$" data={outcomesData} isAnimationActive={false} >
                                <Cell fill={colorMode==="light" ? colores.cyan600 : colores.cyan400} />
                                <Cell fill={colorMode==="light" ? colores.purple600 : colores.purple400 } />
                                <Cell fill={colorMode==="light" ? colores.pink600 : colores.pink400 } />
                                <Cell fill={colorMode==="light" ? colores.red800 : colores.red200 } />
                                <Cell fill={colorMode==="light" ? colores.orange600 : colores.orange400 } />
                                <Cell fill={colorMode==="light" ? colores.yellow600 : colores.yellow400 } />
                            </Pie>
                        </PieChart>
                    </VStack>
                </WrapItem>
            </Wrap>
        </>
    )
}