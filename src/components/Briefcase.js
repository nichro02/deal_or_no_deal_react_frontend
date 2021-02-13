import React, { useState, useEffect } from 'react'



const Briefcase = (props) => {
    //set state for open status
    const[opened, setOpened] = useState(false)

    const openBriefcase = (event) => {
        if(opened === false) {
            console.log('Briefcase opened')
        }
        setOpened(true)
    }

    /*
    const addBriefcaseListener = () =>{
        addEventListener('click', openBriefcase)
    }
    */

    return(
        <div key={props.id} id={props.id} onClick={openBriefcase}>
            <div>
                <img src={'/gameBriefcase.png'}/>
            </div>
            <div>
                <p>{props.value}</p>
            </div>
        </div>
    )
}

export default Briefcase