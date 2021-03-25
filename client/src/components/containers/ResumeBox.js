import React from 'react'
import {Box} from '@chakra-ui/react';

const ResumeBox = ({colorMode, children}) => {
    return(
        <Box minH="40px"  bg={colorMode==="light"?"white":"teal.800"} p="4" boxShadow="md" borderRadius="md" textAlign="center" d="flex" alignItems="center" >
            {children}
        </Box>
    )
}

export default ResumeBox;