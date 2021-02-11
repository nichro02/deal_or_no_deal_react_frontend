export const resMessage = (error) => {
    return(
        (
            error.response &&
            error.response.data.message
        )
        || error.message
        || error.toString

    )
}