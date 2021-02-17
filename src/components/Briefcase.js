import React, { useState, useEffect } from 'react'


import { Box } from '@chakra-ui/react'

const Briefcase = (props) => {
    //console.log(props)
    //set state for open status
    const[opened, setOpened] = useState(false)

    let [numCases, setNumCases] = useState(22)

    const counter = props.counter
    const eliminateValue = props.eliminateCase
    const info = props.turn
    const usersCase = props.userCase

    //let numCases = 22
    //console.log(numCases)
    
    //let isUserCase = false
    let userCase = props.userCase

    const openBriefcase = (event) => {
        //console.log(info())
        if(opened === false) {
            //console.log('Briefcase opened')
            console.log(props.value)
            usersCase(event.target.attributes.id.value)
            //console.log(userCase)
            //console.log(event.target.attributes.id.value)
            eliminateValue(props.value)
            counter()
            setOpened(true)
            setNumCases(numCases--)
        }
    }

    return(
        <Box id={props.id} onClick={openBriefcase} w="25%" display='inline-block'>
            <Box>
                <img id={props.id} src={'/gameBriefcase.png'}/>
            </Box>
            {opened ? (
                <Box textAlign='center' mb={4}>
                    <p>${new Intl.NumberFormat().format(parseInt(props.value))}</p>
                </Box>
                ) : (
                    <Box textAlign='center' mb={4}>
                        <p>Case {props.id + 1}</p>
                    </Box>
                )
            }
            
            
        </Box>
    )
}

export default Briefcase