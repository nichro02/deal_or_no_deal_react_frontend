import { useState } from 'react'

import Game from './Game'
import Briefcase from './Briefcase'

import { Box } from '@chakra-ui/react'

const TurnCounter = (props) => {
    const [casesLeft, setCasesLeft] = useState(22)
    const [boardStatus, setBoardStatus] = useState(true)

    //let numCases = props.casesLeft
    
    const setInfo = () => {
        setCasesLeft(props.casesLeft)
        setBoardStatus(props.boardStatus)
        return casesLeft
    }

    const setCase = () => {
        <Briefcase 

        />
    }

    //console.log(props)
    
    return(<Box mb={4} textAlign='center'><strong>{props.casesLeft}</strong></Box>)
}

export default TurnCounter