import React, { useState, useEffect } from 'react'

import { Box } from '@chakra-ui/react'

const Briefcase = (props) => {
    //set state for open status
    const[opened, setOpened] = useState(false)

    

    const counter = props.counter

    const openBriefcase = (event) => {
        if(opened === false) {
            console.log('Briefcase opened')
            console.log(props.counter)
            counter()
        }
        setOpened(true)
    }

    /*
    const addBriefcaseListener = () =>{
        addEventListener('click', openBriefcase)
    }
    */

    return(
        <Box id={props.id} onClick={openBriefcase} w="25%" display='inline-block'>
            <div>
                <img src={'/gameBriefcase.png'}/>
            </div>
            <div>
                <p>{props.value}</p>
            </div>
        </Box>
    )
}

export default Briefcase