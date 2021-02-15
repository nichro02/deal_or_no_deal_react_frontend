import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { getCurrentUser } from '../services/auth.service.js'

import { putUpdate, profile } from '../services/profile.service'


const EditBio = (props) => {
    console.log(props)
    const currentUser = getCurrentUser()
    const userId = currentUser.data.id
    //console.log(currentUser)
    const [bio, setBio] = useState('')
    //const [edit, setEdit] = useState(true)
    const turnOffEditing = props.editing
    
    useEffect(() => {
        setBio(props.bio)
        //setEdit(props.edit)
    }, [])

    let history = useHistory()

    const onChangePost = (e) => {
        console.log(bio)
        setBio(e.target.value)
    }

    const handleUpdate = (e) => {
        putUpdate(userId, bio).then(() => {
            
            //turnOffEditing()
            history.push(`/profile/${userId}`)
            profile(userId)
            
        })
        
        //history.push(`/profile/${userId}`)
        
        //setEdit(false)
    }

    return (
        <div>
            {(currentUser) && (
                <form onSubmit={handleUpdate}>
                    <label>
                        <input type='text' value={bio} onChange={onChangePost} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>

            )}
        </div>
    )
}

export default EditBio