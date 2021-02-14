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
    Image
} from '@chakra-ui/react'

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = getCurrentUser()
        //console.log(user)

        if (user) {
            setCurrentUser(user)
        }
    }, [])

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
        <div>
            <nav>
                {currentUser ? (

                    
                    <div>
                        <li>
                            <Link to={profileUrl}>
                                {currentUser.data.username}
                            </Link>

                        </li>
                        <li>
                            <a href='/home'>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href='/game'>
                                Start Playing
                            </a>
                        </li>
                        <li>
                            <a href='/login' onClick={logOut}>
                            Logout
                            </a>
                        </li>
                        
                    </div>
                    
                ) : (
                    <div>
                        <li>
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <a href='/game'>
                                Start Playing
                            </a>
                        </li>
                    </div>
                )}
                
            </nav>
        </div>
    )
}

export default Navbar