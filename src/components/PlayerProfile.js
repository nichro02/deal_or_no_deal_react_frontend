import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { profile, deleteUser } from '../services/profile.service'
import { getCurrentUser, logout } from '../services/auth.service'
import {removeItem} from '../utilities/localStorage.utilities'

import { resMessage } from '../utilities/message.utilities'



import { Box, Button, Container } from '@chakra-ui/react'

const PlayerProfile = () => {
    //set state for error message
    const [message, setMessage] = useState("")
    const [playerProfile, setPlayerProfile] = useState([])

    let history = useHistory()

    const currentUser = getCurrentUser()
    const userId = currentUser.data.id
    const { id } = useParams()

    
    
    useEffect(() => {
        profile(id).then((response)=> {
            console.log(response.data.data)
            setPlayerProfile(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    // const getPlayerScores = profile(id).then((response)=> {
    //     const data = response.data.data
    //     setPlayerProfile(data)
    // }).catch(error => {
    //     console.log(error)
    // })

    console.log(playerProfile)

    // const playerScores = playerProfile.games

    // const showScores = playerScores.reverse().map((score, index) => {
    //     return(
    //     <Box key={score.id}>{score.score}</Box>
    //     )
    // })
    
    
    // profile(id).then(user => {
    //     const info = user.data.data
    //     console.log(info)
    //     return(
    //         <div>
    //             {info.player.username}
    //         </div>
    //     )
    //     //.then(info => {setPlayerProfile(info)})
    // })

    const deleteButton = () => {
        console.log(userId)
        console.log(id)
        if(currentUser.data.id == id){
            return <Button onClick={handleDelete}>Delete My Profile</Button>
        }
    }

    const handleDelete = () => {
        logout()
        deleteUser(id).then((response) => {
            console.log(response)
            if(response.data.status.code === 200){
                //send user to homepage with successful login
                history.push('/home')
                window.location.reload()
            }
            else {
                setMessage(resMessage(response.data.status))
            }
        })
    }
    
    return(
        <Box>
            <Box>
               Username
            </Box>
            <Box>
                {deleteButton()}
            </Box>
            
            <Box>
                <strong>Recent Games</strong>
                
            </Box>
            
        </Box>
    )


}
export default PlayerProfile
