import axios from 'axios'

import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'


const API_URL="http://localhost:8000/api/v1/players/"

export const profile = (id) => {
    return axios.get(API_URL+id)
}

export const putUpdate = (id, bio) => {
    return axios.put(API_URL+id,{
        bio
    }, {withCredentials:true}).then((res) => {
        console.log(res)
    })
}

export const deleteUser = (id) => {
    return axios.delete(API_URL+id)
}