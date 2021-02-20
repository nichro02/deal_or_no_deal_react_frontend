import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { getCurrentUser } from '../services/auth.service.js'

import { putUpdate, profile } from '../services/profile.service'

import { Button } from '@chakra-ui/react'

const EditBio = (props) => {
    const currentUser = getCurrentUser()
    const userId = currentUser.data.id
    const [bio, setBio] = useState('')
    const turnOffEditing = props.editing
    
    useEffect(() => {
        setBio(props.bio)
    }, [])

    let history = useHistory()

    const onChangePost = (e) => {
        console.log(bio)
        setBio(e.target.value)
    }

    const handleUpdate = (e) => {
        putUpdate(userId, bio).then((res) => {
            profile(userId)
        })
    }

    return (
        <div>
            {(currentUser) && (
                <form onSubmit={handleUpdate}>
                    <label>
                        <input
                            type='text'
                            value={bio}
                            onChange={onChangePost}
                        />
                    </label>
                    <Button 
                        type='submit' value='Submit'
                        colorScheme='green' 
                    >
                        Update
                    </Button>
                </form>
            )}
        </div>
    )
}

export default EditBio