import { Box } from '@chakra-ui/react'

const TurnCounter = (props) => {
    return(<Box
                mb={4}
                textAlign='center'
            >
                <strong>{props.casesLeft}</strong>
            </Box>)
}

export default TurnCounter