import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend} from 'recharts';
import {VStack, Wrap, WrapItem, Heading} from '@chakra-ui/react'; 

const colores = {
    //totals
    teal600: "#2C7A7B", //total incomes light
    teal400: "#38B2AC", // total incomes dark
    red600: "#C53030", // total outcomes light
    red400: "#F56565", // total outcomes dark
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
    red200: "#FEB2B2", // ocio y recreacion light
    red800: "#822727", // ocio y recreacion dark
    orange600: "#C05621", // bienes durables light
    orange400: "#ED8936", // bienes durables dark
    yellow600: "#B7791F", // otros gastos light
    yellow400: "#ECC94B", // otros gastos dark

}

const Statistics = ({colorMode}) => {

    const data = [
        {name:"Ingresos", "$": 10000},
        {name:"Egresos", "$": 5000}
    ]

    return(
            <VStack spacing={4}>
                <Wrap justify="space-around" align="center">
                    <WrapItem>
                        <VStack bg={colorMode==="light"?"white":"gray.800"}  borderRadius="10%" boxShadow="md">
                            <Heading>Total $</Heading>
                            <BarChart width={230} height={240} data={data}>
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
                        <VStack border="2px solid" borderColor={colorMode==="light"?"gray.500":"gray.400"} bg={colorMode==="light"?"gray.300":"gray.800"}  borderRadius="10%">
                            <Heading>Total %</Heading>
                            <PieChart width={230} height={240} >
                                    <Legend />
                                <Pie dataKey="$" data={data} label fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} isAnimationActive={false} >
                                    <Cell fill="red" />
                                    <Cell fill="blue" />
                                </Pie>
                            </PieChart>
                        </VStack>
                    </WrapItem>
                    <WrapItem>
                        <VStack>
                            <Heading>Total</Heading>
                            <BarChart width={230} height={240} data={data}>
                                <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                                <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                                <Tooltip />
                                <Bar dataKey="$" fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} />
                            </BarChart>
                        </VStack>
                    </WrapItem>
                    <WrapItem>
                        <VStack>
                            <Heading>Total</Heading>
                            <BarChart width={230} height={240} data={data}>
                                <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                                <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                                <Tooltip />
                                <Bar dataKey="$" fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} />
                            </BarChart>
                        </VStack>
                    </WrapItem>
                    <WrapItem>
                        <VStack>
                            <Heading>Total</Heading>
                            <BarChart width={230} height={240} data={data}>
                                <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                                <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                                <Tooltip />
                                <Bar dataKey="$" fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} />
                            </BarChart>
                        </VStack>
                    </WrapItem>
                    <WrapItem>
                        <VStack>
                            <Heading>Total</Heading>
                            <BarChart width={230} height={240} data={data}>
                                <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                                <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                                <Tooltip />
                                <Bar dataKey="$" fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} />
                            </BarChart>
                        </VStack>
                    </WrapItem>
                    <WrapItem>
                        <VStack>
                            <Heading>Total</Heading>
                            <BarChart width={230} height={240} data={data}>
                                <XAxis dataKey="name" stroke={colorMode==="light"?"#718096":"#CBD5E0"} />
                                <YAxis stroke={colorMode==="light"?"#718096":"#CBD5E0"}/>
                                <Tooltip />
                                <Bar dataKey="$" fill={colorMode==="light"?"#2C7A7B":"#38B2AC"} />
                            </BarChart>
                        </VStack>
                    </WrapItem>
                    
                </Wrap>
            </VStack>
    )
}

export default Statistics;