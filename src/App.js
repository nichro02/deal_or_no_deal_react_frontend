import { Switch, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Game from './components/Game'

import { ChakraProvider } from '@chakra-ui/react'

import logo from './logo.svg';
import './css/App.css';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      Hello world
      <Game />
      {/* 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      
    </div>
    */}
    </ChakraProvider>
  );
}

export default App;
