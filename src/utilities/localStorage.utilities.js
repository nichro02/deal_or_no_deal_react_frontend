//set items from local storage
export const setItem = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}

//get items from local storage
export const getItem = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }
    return null
}

//remove items from local storage
export const removeItem = (key) => {
    return localStorage.removeItem(key)
}