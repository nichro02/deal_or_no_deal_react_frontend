import axios from 'axios'

import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL="http://localhost:8000/api/v1/players/"

//login user
export const login = (username, password) => {
    return axios
    .post(API_URL+'login', {
        //withCredentials: true,
        username,
        password
    })
    .then((response) => {
        if(response.data.accessToken){
            setItem('user', response.data)
            
        }
        console.log(response)
        return response.data
    })
}

//logout user
export const logout = () => {
    removeItem('user')
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}