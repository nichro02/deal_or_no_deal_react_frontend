import React, { useState, useEffect } from 'react'

import { Box } from '@chakra-ui/react'

const BonusBriefcase = (props) => {

    const[opened, setOpened] = useState(false)

    const openBriefcase = (event) => {

            setOpened(true)
        
    }

    return(
        <Box key={props.id} onClick={openBriefcase} id={props.id}w="25%" display='inline-block'>
            <div>
                <img src={'/bonusBriefcase.png'}/>
            </div>
            {opened ? (
                <div>
                    <p>{props.value}</p>
                </div>
                ) : (
                    <div>
                        <p>Bonus Briefcase</p>
                    </div>
                )
            }
        </Box>
    )
}

export default BonusBriefcase