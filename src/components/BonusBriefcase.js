import React, { useState} from 'react'

import { Box } from '@chakra-ui/react'

const BonusBriefcase = (props) => {
    const[opened, setOpened] = useState(false)

    return(
        <Box
            key={props.id} 
            id={props.id}w="25%"
            display='inline-block'
        >
            <Box>
                <img src={'/bonusBriefcase.png'}/>
            </Box>
            {opened ? (
                <Box
                    textAlign='center'
                    mb={4}
                >
                    <p>{props.value}</p>
                </Box>
                ) : (
                    <Box
                        textAlign='center'
                        mb={4}
                    >
                        <p>Bonus Case</p>
                    </Box>
                )
            }
        </Box>
    )
}

export default BonusBriefcase