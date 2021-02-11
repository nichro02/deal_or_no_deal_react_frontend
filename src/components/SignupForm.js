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

const SignUpForm = () => {
    return(
        
            <form action='submit'>
                <Stack spacing ={4}>
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<Icon name='info' />} />
                            <Input
                                type ='name'
                                placeholder ='First Name'
                                aria-label ='First Name'
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<Icon name='info' />} />
                            <Input
                                    type ='name'
                                    placeholder ='Last Name'
                                    aria-label ='Last Name'
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
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<Icon name='info' />} />
                            <Input
                                    type ='password'
                                    placeholder ='Password'
                                    aria-label ='Password'
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
                        Sign Up!
                    </Button>

                    <FormHelperText textAlign='center'>
                        We will never share your email!
                        <br />
                        🤞
                    </FormHelperText>

                </Stack>
            </form>
        
    )
}

export default SignUpForm