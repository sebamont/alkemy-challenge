import React from 'react'
import {Heading} from '@chakra-ui/react';

const HeadingComp = () => {
    return(
        <Heading
        as="h1"
        bgGradient='linear(to-r, gray.400, teal.400 )'
        bgClip='text'
        textAlign="center"
        mt={[4,10]}
        mb={{base:0, xl:5, "2xl":4}}
        size='2xl'
        pb={[4,8]}
        fontWeight='extrabold'>
          Tu dinero, un solo lugar.
      </Heading>
    )
}

export default HeadingComp;