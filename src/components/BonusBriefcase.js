import React, { useState, useEffect } from 'react'

import { Box } from '@chakra-ui/react'

const BonusBriefcase = (props) => {

    const[opened, setOpened] = useState(false)

    return(
        <Box key={props.id} id={props.id}w="25%" display='inline-block'>
            <div>
                <img src={'/bonusBriefcase.png'}/>
            </div>
            <div>
                <p>{props.value}</p>
            </div>
        </Box>
    )
}

export default BonusBriefcase