import React, {useRef} from 'react';
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
    Tooltip} 
    from '@chakra-ui/react';
import {FaMoon, FaSun, FaPlusCircle, FaChartLine} from 'react-icons/fa';

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
                    <CustomDrawerOverlay />
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


const CustomDrawerOverlay = () => {
    return(
        <DrawerOverlay>
                        <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create your account</DrawerHeader>

                        <DrawerBody>
                        </DrawerBody>

                        <DrawerFooter>
                            Cancel
                        </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
    )
}
export default FooterBar;