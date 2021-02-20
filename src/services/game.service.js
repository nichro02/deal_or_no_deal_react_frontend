import axios from 'axios'

//const API_URL="http://localhost:8000/api/v1/games/"
const API_URL= process.env.REACT_APP_BACKEND_URL+'/api/v1/games/'

export const recordScore = (user_id, score) => {
    return axios.post(API_URL,{
        user_id,
        score
    })
}

export const get_scores = () => {
    return axios.get(API_URL+'top_scores')
}

