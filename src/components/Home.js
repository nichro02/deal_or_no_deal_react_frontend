import { useState, useEffect } from 'react'

import { get_scores } from '../services/game.service'

import { Box, Button, Container } from '@chakra-ui/react'

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
            <div key={score.id}>
                <div>{score.score}</div>
                <div>{score.user_id.username}</div>
            </div>
        )
    })

    // const highScores = get_scores().then(  (response) => {
    //     //console.log(response)
    //     const scoreInfo = response.data.data
    //     setScores(scoreInfo)
    //     return(
    //         <Box>
    //             {scoreInfo.map((score, index) =>{
                    
    //             })}
    //         </Box>
    //     )
    // })
    
    
    
    return(
        <div>
            {highScores}
        </div>
    )
}

export default Home