import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Flex,
    Stack,
    PseudoBox,
    useColorMode,
    IconButton,
    Box,
    Image
} from '@chakra-ui/react'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const bgColor = { light: 'gray.300', dark: 'gray.600'}
    const textColor = { light:'black', dark: 'gray.100' }
    //const router = useRouter()

    return(

    
    <Flex
        w='100vw'
        bg={bgColor[colorMode]}
        color={ textColor[colorMode] }
        align='center'
        justify='center'
        fontSize={['md', 'lg', 'xl', 'xl']}
        h='7vh'
        boxShadow='md'
        p={2}
    >
        <Flex 
            w={['100vw', '100vw', '80vw', '80vw']} 
            justify='space-around'
        >
            <Box>
                Put icon here
            </Box>
            <Stack
                spacing={8}
                color={textColor[colorMode]}
                justify='center'
                align='center'
                isInline
            >
                <PseudoBox
						position='relative'
                >
					<Link href='/'>
						<a>Home</a>
					</Link>
				</PseudoBox>

            </Stack>
            <Box>
                <IconButton
                    rounded='full'
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? 'moon' : 'sun'}
                >
                    Change Color Mode
                </IconButton>
            </Box>
        </Flex>

    </Flex>
    )
}

export default Navbar