import React, { useState, useEffect } from 'react'



const BonusBriefcase = (props) => {

    const[opened, setOpened] = useState(false)

    return(
        <div key={props.id} id={props.id}>
            <div>
                <img src={'/bonusBriefcase.png'}/>
            </div>
            <div>
                <p>{props.value}</p>
            </div>
        </div>
    )
}

export default BonusBriefcase