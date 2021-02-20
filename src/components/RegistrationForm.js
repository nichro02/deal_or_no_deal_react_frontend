import { Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image } from '@chakra-ui/react'

import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const RegistrationForm = () => {
    //give user option for dark mode
    const {colorMode} = useColorMode()
    return(
        <Box 
            w='350px' 
            p={3} 
            boxShadow='sm' 
            rounded='lg'
            bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
            mt={60}
        >
            <Image
                src='security.png'
                w='80px'
                mx='auto'
                my={6}
            />
            <Tabs
                variant='enclosed-colored'
                m={4}
                isFitted
            >
                <TabList>
                    <Tab>Sign Up</Tab>
                    <Tab>Login</Tab>
                </TabList>
                <TabPanels mt={3}>
                    <TabPanel>
                        <SignupForm />
                    </TabPanel>
                    <TabPanel>
                        <LoginForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default RegistrationForm