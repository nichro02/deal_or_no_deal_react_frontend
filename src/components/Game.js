import React, { useState, useEffect } from 'react'

import Briefcase from './Briefcase'
import BonusBriefcase from './BonusBriefcase'

const Game = () => {
    //set state for board
    const [activeBoard, setActiveBoard] = useState(false)
    //set state for bank offer
    const [bankOffer, setBankerOffer] = useState(false)
    //set state for bonus round
    const [bonusRound, setBonusRound] = useState(false)
    //set state for score
    const [casesLeftToOpen, setCasesLeftToOpen] = useState(21)
    //set state for user case
    const [userCase, setUserCase] = useState()
    
    //briefcase values
    const prizeValues = [1, 5, 10, 25,  50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 1000000]
    //bonus outcomes
    const bonusOutcomes = ['add 10k', 'double money', 'lose half', 'lose all']
    //total cases to open
    //let casesToOpen = 21
    //banker's offer
    let offerValue = 0
    // player's winnings
    let playerWinnings = 0
    // holding array to return briefcases
    let briefcaseArray = []

    //shuffle prize values
    const shufflePrizes = (arr) => {
        for(let i = arr.length - 1; i > 0; i--){
            const random = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[random]
            arr[random] = temp
        }
    }

    //create briefcases
    const createBriefcases = () => {
        shufflePrizes(prizeValues)
        for(let i = 0; i < prizeValues.length; i++) {
            let newCase = <Briefcase 
                value = {prizeValues[i]}
                id = {i}
                key = {i}
                counter= {decrementCasesToOpen}
            />
            briefcaseArray.push(newCase)
        }
        return briefcaseArray
    }

    //create bonus case
    const createBonusCase = () => {
        createBriefcases()
        shufflePrizes(bonusOutcomes)
        for(let i = 0; i < 1; i++) {
            let bonusCase = <BonusBriefcase 
                value = {bonusOutcomes[i]}
                id = {'bonus'}
                key = {'bonus'}
            />
            briefcaseArray.push(bonusCase)
        }
        return briefcaseArray
    }

    //handle user selects briefcase
    const playersCase = () => {
        setUserCase(<Briefcase />)
        setActiveBoard(true)
    }

    //decrement cases to open
    const decrementCasesToOpen = () => {
        if(activeBoard === false && casesLeftToOpen === 21){
            playersCase()
        }
        else {
            setCasesLeftToOpen(casesLeftToOpen - 1)
        }
    }
    

    return(
        
        <div>
            <div>
                Your case: {userCase}
            </div>
            <div>
                Cases left to open: {casesLeftToOpen}
            </div>
            {createBonusCase()} 
        </div>
    )
}

export default Game