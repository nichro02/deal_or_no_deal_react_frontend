import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import EditBio from './EditBio'

import { profile, deleteUser } from '../services/profile.service'
import { getCurrentUser, logout } from '../services/auth.service'

import { resMessage } from '../utilities/message.utilities'

import { Box, Button, Container, Image, Grid } from '@chakra-ui/react'

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
            setPlayerProfile(response.data.data.player)
            setPlayerScores(response.data.data.games)
    
        }).catch(error => {
            console.log(error)
        })
    }, [])
    

    const showScores = playerScores.reverse().slice(0, 9).map((score, index) => {
         return(
            <Box 
                key={score.id}
                border ='1px'
                borderColor='gray.200'
                w='30vw'
                textAlign='center'
            >
                ${new Intl.NumberFormat().format(parseInt(score.score))}
            </Box>
         )
    })

    const updateButton = () => {
        if(currentUser.data.id == id){
            return (
                <Button 
                onClick={handleBioUpdate}
                colorScheme='purple'
                >
                    Update My Bio
                </Button>
            )
        }
    }

    const handleBioUpdate = () => {
        setEdit(true)
    }

    const resetEditing = () => {
        setEdit(false)
    }

    const deleteButton = () => {
        if(currentUser.data.id == id){
            return (
                <Button 
                    onClick={handleDelete}
                    colorScheme='red'
                >
                    Delete My Profile
                </Button>
            )
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
        <Box w='100vw'>
            <Box mt={40}>
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={8}
            >
                <Box p={8}>
                    <Box>
                        <strong>{playerProfile.username}'s Profile</strong>
                    <Image 
                        src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                        alt='profile image'
                        rounded='lg'
                    />
                    </Box>
                    <Box>
                        <strong>About Me</strong>
                        {!edit && (<><Box>{playerProfile.bio}</Box>
                        <Box>{updateButton()}</Box></>)
                        }
                        {edit && (
                        <EditBio
                            bio={playerProfile.bio}
                            editing={resetEditing}
                        />
                        )}
                    </Box>
                </Box>
            
                <Container centerContent p={8}>
                    <strong>Recent Games</strong>
                    {showScores}
                </Container>
            </Grid>

            <Container centerContent p={8}>
                {deleteButton()}
            </Container>
            </Box>
        </Box>
    )
}
export default PlayerProfile
