import { useState, useEffect } from 'react'

import { get_scores } from '../services/game.service'

import { Box, Button, Container,Link } from '@chakra-ui/react'

const Home = () => {
    let [scores, setScores] = useState([])

    useEffect(() => {
        get_scores().then((response)=>{
            setScores(response.data.data)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])


    const highScores = scores.map((score, index) => {
        return(
            <Box
                key={score.id}
                border ='1px'
                borderColor='gray.200'
                w='30vw'
                textAlign='center'
                d='flex'
                justifyContent='space-around'
            >
                <Box>
                    {score.score}
                </Box>
                <Box>
                    <a href = {`/profile/${score.user_id.id}`}>{score.user_id.username}</a>
                </Box>
            </Box>
        )
    })

    return(
        <Box mt={40}>
            <Box p={8} textAlign='center'>
                <Button colorScheme='purple'>
                    <a href={'/game'}>Start Playing</a>
                </Button>
            </Box>
            <Box p={8} textAlign='center'>
                <strong>High Scores</strong>
                {highScores}
            </Box>
        </Box>
    )
}

export default Home