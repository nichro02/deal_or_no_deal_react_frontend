import React, { useState, useEffect } from 'react'

import TurnCounter from './TurnCounter'

import { Box } from '@chakra-ui/react'

const Briefcase = (props) => {
    //console.log(props)
    //set state for open status
    const[opened, setOpened] = useState(false)

    //const[caseSelected, setCaseSelected] = useState(false)

    //const [userCase, setUserCase] = useState('')

    /*
    useEffect(() => {
        if(!caseSelected){
            setCaseSelected(true)
            console.log("USE EFFECT FIRED")
        }
    }, [])
    */
    const counter = props.counter
    const eliminateValue = props.eliminateCase
    const info = props.turn
    
    
    //let isUserCase = false
    let userCase = ''

    const openBriefcase = (event) => {
        //console.log(info())
        if(opened === false) {
            //console.log('Briefcase opened')
            //console.log(props.value)
            eliminateValue(props.value)
            counter()
            setOpened(true)
        }
    }

    return(
        <Box id={props.id} onClick={openBriefcase} w="25%" display='inline-block'>
            <div>
                <img id={props.id} src={'/gameBriefcase.png'}/>
            </div>
            {opened ? (
                <div>
                    <p>{props.value}</p>
                </div>
                ) : (
                    <div>
                        <p>Briefcase {props.id + 1}</p>
                    </div>
                )
            }
            
        </Box>
    )
}

export default Briefcase