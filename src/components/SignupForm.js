import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { isEmail } from 'validator'

import { login, register } from '../services/auth.service'
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

const validateUsernameLength = (value) => {
    if(value.length <= 3 || value.length >= 15) {
        return (
            <div>
                Your username must be between 3 and 20 characters
            </div>
        )
    }
}

const validatePasswordLength = (value) => {
    if(value.length < 6 || value.length >=20) {
        return(
            <div>
                You password must be between 6 and 20 characters
            </div>
        )
    }
}

const validateEmailFormat = (value) => {
    if(!isEmail(value)){
        return(
            <div>
                This is not a valid email
            </div>
        )
    }
}

const SignUpForm = () => {
    //set state for username
    const [username, setUsername] = useState('')
    //set state for password
    const [password, setPassword] = useState('')
    //set state for email
    const [email, setEmail] = useState('')
    //set state for error message
    const [message, setMessage] = useState('')
    //use history to login and reroute upon successful signup
    let history = useHistory()

    //track what username is entered
    const onChangeUsername = (e) => {
        const username = e.target.value
        console.log(username)
        setUsername(username)
    }

    //track what password is entered
    const onChangePassword = (e) => {
        const password = e.target.value
        console.log(password)
        setPassword(password)
    }

    //track what email is entered
    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    //handle signup request
    const handleSignup = (e) => {
        e.preventDefault()
        register(username, email, password)
        .then((response) => {
            console.log(response)
            if(response.data.status.code === 201){
                //send user to homepage with successful login
                login(username, password, {withCredentials: true})
                .then(() => {
                    history.push('/home')
                })
            }
            else {
                setMessage(resMessage(response.data.status))
            }
        })
    }

    return(
        
        <form action='submit' onSubmit={handleSignup}>
            <Stack spacing ={4}>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name='info' />} />
                        <Input
                            type ='username'
                            placeholder ='Username'
                            aria-label ='Username'
                            onChange={onChangeUsername}
                            validations={[validateUsernameLength]}
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
                            type ='email'
                            placeholder ='Email'
                            aria-label ='Email'
                            onChange={onChangeEmail}
                            validations={[validateEmailFormat]}
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
                            validations={[validatePasswordLength]}
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
                    Sign Up
                </Button>

                <FormHelperText textAlign='center'>
                    We will never share your email!
                    <br />
                    🤞
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

export default SignUpForm