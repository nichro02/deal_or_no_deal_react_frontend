import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { login } from '../services/auth.service'
import { resMessage } from '../utilities/message.utilities'

import { 
    Stack, 
    Input, 
    InputLeftElement,
    FormControl,
    InputGroup,
    Icon,
    Button,
    Divider, 
    FormHelperText
} from '@chakra-ui/react'

//FormControl allows you to control what is required and what is disabled

const LoginForm = (props) => {
    //set state for username
    const [username, setUsername] = useState("")
    //set state for password
    const [password, setPassword] = useState("")
    //set state for error message
    const [message, setMessage] = useState("")

    let history = useHistory()

    //track what username is entered
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    //track what password is entered
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    //process login request
    const handleLogin = (e) => {
        e.preventDefault()
        login(username, password)
        .then((response) => {
            if(response.status.code === 200){
                //send user to homepage with successful login
                history.push('/home')
                window.location.reload()
            }
            else {
                setMessage(resMessage(response.status))
            }
        })
        

    }

    return(
        
            <form action='submit' onSubmit={handleLogin}>
                <Stack spacing ={4} top={32}>

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<Icon name='info' />} />
                            <Input
                                    type ='username'
                                    placeholder ='username'
                                    aria-label ='username'
                                    onChange={onChangeUsername}
                            />
                        </InputGroup>
                    </FormControl>


                    <Divider 
                        borderColor='gray.300'
                    />

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<Icon name='info' />} />
                            <Input
                                    type ='password'
                                    placeholder ='Password'
                                    aria-label ='Password'
                                    onChange={onChangePassword}
                            />
                        </InputGroup>
                    </FormControl>

                    <Button
                        type='submit'
                        variant='solid'
                        variantcolor='red'
                        boxShadow='sm'
                        _hover ={{boxShadow: 'md'}}
                        _active={{boxShadow: 'lg'}}
                        
                    >
                        Login
                    </Button>

                    <FormHelperText textAlign='center'>
                        Login to join the party
                        <br />
                    </FormHelperText>
                    {message && (
                        <div>
                            <div>
                                {message}
                            </div>
                        </div>
                    )}

                </Stack>
            </form>
        
    )
}

export default LoginForm