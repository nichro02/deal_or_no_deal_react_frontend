import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { logout, getCurrentUser } from '../../services/auth.service'

import {
    Flex,
    Stack,
    PseudoBox,
    useColorMode,
    IconButton,
    Box,
    Image,
    Grid,
    Spacer
} from '@chakra-ui/react'

import { MoonIcon } from '@chakra-ui/icons'

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = getCurrentUser()
        //console.log(user)

        if (user) {
            setCurrentUser(user)
        }
    }, [])

    const { colorMode, toggleColorMode } = useColorMode()

    let profileUrl = null
    

    if(currentUser){
        //console.log(currentUser.data)
        profileUrl = `/profile/${currentUser.data.id}`
        //console.log(profileUrl)
    }

    const logOut = () => {
        logout()
    }

    return(
        <Box
            bg='#805AD5'
            color='white'
            position='fixed'
            top={0}
            h={32}
        >
            <Box fontSize='4xl' textAlign='center'>
                <Link to={'/home'}>
                <strong>Deal Or No Deal</strong>
                </Link>
            </Box> 
            <Flex
            w='100vw'
            fontSize={['md', 'lg', 'xl', 'xl']}
            p={2}
            >
               
                {currentUser ? (
                    
                    
                    <Grid templateColumns="repeat(5, 1fr)" gap={8} pl={8}>
                        <Box w="70px" h="10">
                            {/* <Link to={profileUrl}>
                                {currentUser.data.username}
                            </Link> */}
                            <a href={profileUrl} >
                            {currentUser.data.username}
                            </a>
                        </Box>
                        <Spacer />
                        <Box w="180px" h="10" textAlign="right">
                            <Link to={'/game'}>
                                Start Playing
                            </Link>
                        </Box>
                        <Box w="180px" h="10" textAlign="right">
                            <IconButton
                                rounded='full'
                                onClick={toggleColorMode}
                                icon={<MoonIcon color={'yellow'}/>}
                                bg={'purple.200'}
                                aria-label='Toggle dark mode'
                            >
                                Toggle Dark Mode
                            </IconButton>
                        </Box>
                        <Box w="170px" h="10" textAlign="right">
                            <a href='/login' onClick={logOut}>
                            Logout
                            </a>
                        </Box>
                        
                    </Grid>    
                    
                    
                ) : (
                    <Grid templateColumns="repeat(3, 1fr)" gap={8} w='100vw' justify="center">
                        <Box w="100%" h="10" textAlign="center">
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </Box>
                        <Spacer />
                        <Box w="100%" h="10" textAlign="center">
                            <a href='/game'>
                                Start Playing
                            </a>
                        </Box>
                    </Grid>
                )}
                
            
            </Flex>
        </Box>
    )
}

export default Navbar