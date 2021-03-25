import React, {useRef, useContext, useState} from 'react';
import {
    IconButton,
    Box, 
    useDisclosure, 
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tooltip,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    Container,
    VStack
    }from '@chakra-ui/react';
import {FaMoon, FaSun, FaPlusCircle, FaChartLine} from 'react-icons/fa';
import {GlobalContext} from '../context/GlobalContext';

const FooterBar = ({colorMode, toggleColorMode}) => {
    const btnRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
        <>
            <Box w="100%" pos="fixed" bottom="0" py="10" bg={colorMode==="light" ? "gray.200" : "gray.700"}>
                <Box d="flex" justifyContent="center" alignItems="center">
                    <CustomIcon
                        ttlabel="Ver estadísticas"
                        ttplacement="top-end"
                        icon={<FaChartLine />}
                        colormode={colorMode}
                        />

                    <CustomIcon
                        ttlabel="Agregar un nuevo movimiento"
                        ttplacement="top"
                        icon={<FaPlusCircle />}
                        colormode = {colorMode}
                        mx="5"
                        onClick={onOpen}
                        customref={btnRef}
                        />

                    <CustomIcon
                        ttlabel={colorMode==='light'?"Cambiar a modo oscuro": "Cambiar a modo claro"}
                        ttplacement="top-start"
                        icon={colorMode==='light' ? <FaMoon />:<FaSun />}
                        colormode={colorMode}
                        onClick={toggleColorMode}
                        />
                </Box>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                finalFocusRef={btnRef}
                >
                    <CustomDrawerOverlay onClose={onClose}/>
            </Drawer>
    </>
    )
}
 
const CustomIcon = (props) => {
    return(
        <Tooltip label={props.ttlabel} placement={props.ttplacement} aria-label="Button tooltip">
            <IconButton
                colorScheme="teal"
                isRound="true"
                color={props.colormode==="light" ? "gray.200" : "gray.700"}
                w="50px"
                h="50px"
                fontSize="30px"
                boxShadow="inline"
                ref = {props.customref}
                { ...props}
                />
        </Tooltip>
    )
}


const CustomDrawerOverlay = ({onClose}) => {
    const {addMovement} = useContext(GlobalContext);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        
        const newMovement = {
            movementDescription: description,
            movementAmount: amount,
            movementCategory: category
        }
        addMovement(newMovement);
        onClose();
    }

    return(
        <DrawerOverlay>
                        <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader alignSelf="center">Agregar movimiento de dinero</DrawerHeader>

                        <DrawerBody>
                        </DrawerBody>
                        <Container>
                            <form onSubmit={handleSubmit}>
                                <VStack>
                                    <FormControl id="description" isRequired>
                                        <FormLabel>Descripción</FormLabel>
                                        <Input placeholder="Sueldo Mensual Marzo" onChange={(e) => setDescription(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="amount" isRequired>
                                        <FormLabel>Monto</FormLabel>
                                        <NumberInput max={500000} min={-500000}>
                                            <NumberInputField placeholder="1000" onChange={(e) => setAmount(e.target.value)}/>
                                        </NumberInput>
                                        <FormHelperText>Para registrar gastos, anótelos en negativo. Por ejemplo: -1000</FormHelperText>
                                    </FormControl>
                                    <FormControl id="category" isRequired >
                                        <FormLabel>Categoría</FormLabel>
                                        <Select placeholder="Selecciona una categoría" onChange={(e) => setCategory(e.target.value)}>
                                            <option>Sueldo/Salarios</option>
                                            <option>Otros Ingresos</option>
                                            <option>Alquiler</option>
                                            <option>Expensas y Servicios Mensuales</option>
                                            <option>Mercadería</option>
                                            <option>Ocio y Recreación</option>
                                            <option>Bienes durables</option>
                                            <option>Otros gastos</option>
                                        </Select>
                                    </FormControl>
                                    <Box>
                                        <Button type="submit" colorScheme="teal">Agregar</Button>
                                        <Button ml="5" colorScheme="gray" onClick={onClose}>Cancelar</Button>
                                    </Box>
                                </VStack>
                            </form>
                        </Container>
                        <DrawerFooter>
                        </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
    )
}
export default FooterBar;