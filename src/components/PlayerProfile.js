import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import EditBio from './EditBio'

import { profile, deleteUser, putUpdate } from '../services/profile.service'
import { getCurrentUser, logout } from '../services/auth.service'
import {removeItem} from '../utilities/localStorage.utilities'

import { resMessage } from '../utilities/message.utilities'



import { Box, Button, Container } from '@chakra-ui/react'

const PlayerProfile = () => {
    //set state for error message
    const [message, setMessage] = useState("")
    //player profile info
    const [playerProfile, setPlayerProfile] = useState([])
    //player scores
    const [playerScores, setPlayerScores] = useState([])
    
    const [edit, setEdit] = useState(false)
    console.log(edit)
    let history = useHistory()

    const currentUser = getCurrentUser()
    //const userId = currentUser.data.id
    const { id } = useParams()

    
    useEffect(() => {
        
        profile(id).then((response)=> {
            //console.log(response.data.data)
            setPlayerProfile(response.data.data.player)
            setPlayerScores(response.data.data.games)
    
        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    //  const getPlayerScores = profile(id).then((response)=> {
    //      const data = response.data.data
    //      setPlayerProfile(data)
    //  }).catch(error => {
    //     console.log(error)
    // })

    //console.log(playerProfile)
    //console.log(playerScores)

    //const playerScores = playerProfile.games

    const showScores = playerScores.reverse().map((score, index) => {
         return(
         <Box key={score.id}>{score.score}</Box>
         )
    })
    
    
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

    const updateButton = () => {
        if(currentUser.data.id == id){
            return <Button onClick={handleBioUpdate}>Update My Bio</Button>
        }
    }

    const handleBioUpdate = () => {
        setEdit(true)
    }

    const resetEditing = () => {
        setEdit(false)
    }

    const deleteButton = () => {
        // console.log(userId)
        // console.log(id)
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
               {playerProfile.username}'s Profile
            </Box>
            <Box>
                <strong>About Me</strong>
                <Box>{playerProfile.bio}</Box>
                <Box>{updateButton()}</Box>
                {edit && (
                    <EditBio bio={playerProfile.bio} editing={resetEditing}/>
                )}
            </Box>
            
            
            <Box>
                <strong>Recent Games</strong>
                {showScores}
            </Box>
            <Box>
                {deleteButton()}
            </Box>
            
        </Box>
    )


}
export default PlayerProfile
