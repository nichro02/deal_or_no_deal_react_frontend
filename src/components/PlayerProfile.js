import { useState, useEffect } from 'react'

import { profile } from '../services/profile.service'
import { getCurrentUser } from '../services/auth.service'

import { useParams } from 'react-router-dom'


const PlayerProfile = () => {
    const [playerProfile, setPlayerProfile] = useState([])

    const currentUser = getCurrentUser()
    const userId = currentUser.data.id
    //console.log(currentUser)
    const { id } = useParams()
    console.log(id)

    // const getPlayer = () => {
    //     return profile(userId).then(user => {
    //         const info = user.data
    //         console.log(info)
    //         setPlayerProfile(info)
    //     })
            
    // } 

    profile(id).then(user => {
        const info = user.data.data
        console.log(info)
        return(
            <div>
                {info.player.username}
            </div>
        )
        //.then(info => {setPlayerProfile(info)})
    })

    return(
        <div>
            PLAYER PROFILE
        </div>
    )


}
export default PlayerProfile
