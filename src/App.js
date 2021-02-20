import { Switch, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Game from './components/Game'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import PlayerProfile from './components/PlayerProfile'

import { ChakraProvider, Flex } from '@chakra-ui/react'

import logo from './logo.svg';
import './css/App.css';


function App() {
  return (
    <ChakraProvider>
      
      <Flex direction='column' align='center' justify='center'>
        <Navbar />
        <Switch>
          <Route exact path= '/game' component={Game} />
          <Route exact path={['/login','signup']} component={RegistrationForm} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/profile/:id' component={PlayerProfile}/>
        </Switch>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
