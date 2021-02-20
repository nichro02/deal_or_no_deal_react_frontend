import axios from 'axios'

import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'


//const API_URL="http://localhost:8000/api/v1/players/"
const API_URL= process.env.REACT_APP_BACKEND_URL+'/api/v1/players/'

//register user
export const register = (username, email, password) => {
    return axios
    .post(API_URL+'register', {
        username,
        email,
        password
    })
}

//login user
export const login = (username, password) => {
    return axios
    .post(API_URL+'login', {
        //withCredentials: true,
        username,
        password
    })
    .then((response) => {
        if(response.data){
            setItem('user', response.data)
        }
        console.log(response)
        return response.data
    })
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}

//logout user
export const logout = () => {
    removeItem('user')
    return axios.get(API_URL+'logout', {}).then((response) => {
        console.log(response)
    })
}

