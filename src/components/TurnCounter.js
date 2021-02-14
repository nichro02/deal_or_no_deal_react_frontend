import { useState } from 'react'

import Game from './Game'
import Briefcase from './Briefcase'

const TurnCounter = (props) => {
    const [casesLeft, setCasesLeft] = useState(22)
    const [boardStatus, setBoardStatus] = useState(true)

    //let numCases = props.casesLeft
    
    const setInfo = () => {
        setCasesLeft(props.casesLeft)
        setBoardStatus(props.boardStatus)
    }

    const setCase = () => {
        <Briefcase 

        />
    }
    

    //console.log(props)
    
    return(<div>{props.casesLeft}</div> )
}

export default TurnCounter