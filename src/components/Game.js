import React, { useState, useEffect } from 'react'

import Briefcase from './Briefcase'
import BonusBriefcase from './BonusBriefcase'

import { Box } from '@chakra-ui/react'

const Game = () => {
    //set state for board
    const [activeBoard, setActiveBoard] = useState(false)
    //set state for bank offer
    const [bankOffer, setBankOffer] = useState(0)
    //set state for bonus round
    const [bonusRound, setBonusRound] = useState(false)
    //set state for score
    const [casesLeftToOpen, setCasesLeftToOpen] = useState(21)
    //set state for user case
    const [userCase, setUserCase] = useState(false)
    //set state for eliminated values
    const [eliminatedValues, setEliminatedValues] = useState([])
    
    //briefcase values
    const prizeValues = [1, 5, 10, 25,  50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 1000000]

    //bonus outcomes
    const bonusOutcomes = ['add 10k', 'double money', 'lose half', 'lose all']
    //banker's offer
    let offerValue = 0
    // player's winnings
    let playerWinnings = 0
    // holding array to return briefcases
    let briefcaseArray = []
    //shuffle briefcases
    let shuffledCases = []
    //bonus briefcase
    let shuffledBonusCases = []

    //shuffle prize values
    const shufflePrizes = (arr) => {
        for(let i = arr.length - 1; i > 0; i--){
            const random = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[random]
            arr[random] = temp
        }
        return arr
    }

    const shuffleCases = () => {
        const shuffling = shufflePrizes(prizeValues)

        shuffledCases = shuffling
        //console.log(shuffledCases)

        return shuffledCases
    }

    shuffleCases()

    const handleBonusCase = () => {
        const shuffling = shufflePrizes(bonusOutcomes)

        shuffledBonusCases = shuffling

        return shuffledBonusCases
    }

    handleBonusCase()

    //create briefcases
    const createBriefcases = () => {
        //shufflePrizes(prizeValues)
        for(let i = 0; i < shuffledCases.length; i++) {
            let newCase = <Briefcase 
                value = {shuffledCases[i]}
                id = {i}
                key = {i}
                isUserCase = {userCase}
                counter= {decrementCasesToOpen}
                eliminateCase={trackEliminatedValues}
            />
            briefcaseArray.push(newCase)
        }
        return briefcaseArray
    }

    //create bonus case
    const createBonusCase = () => {
        createBriefcases()
        //shufflePrizes(bonusOutcomes)
        for(let i = 0; i < 1; i++) {
            let bonusCase = <BonusBriefcase 
                value = {shuffledBonusCases[i]}
                id = {'bonus'}
                key = {'bonus'}
            />
            briefcaseArray.push(bonusCase)
        }
        //console.log(briefcaseArray)
        return briefcaseArray
    }

    
    const setBoard = () => {
        //console.log(briefcaseArray)
        return briefcaseArray.map(briefcase => <Box>{briefcase}</Box>)
    }
    
    //handle user selects briefcase
    const playersCase = () => {
        setUserCase(true)
        setActiveBoard(true)
    }

    //decrement cases to open
    const decrementCasesToOpen = () => {
        if(activeBoard === false && casesLeftToOpen === 21){
            playersCase()
        }
        else {
            setCasesLeftToOpen(casesLeftToOpen - 1)
            bankerCalls()
        }
    }

    //track eliminted values
    const trackEliminatedValues = (value) => {
        console.log(value)
        
        setEliminatedValues([...eliminatedValues, value])
        console.log(eliminatedValues)
    }
    
    //display available values

    
    //declare when banker will call
    const bankerCalls = () => {
        if(casesLeftToOpen === 16
            || casesLeftToOpen === 13
            || casesLeftToOpen === 10
            || casesLeftToOpen === 7
            || casesLeftToOpen === 4
            || casesLeftToOpen === 2
            || casesLeftToOpen === 1    
        ) {
            console.log('BANKER CALLS')
            calculateOffer()
        }
    }

    //compute bankers offer
    const calculateOffer = () => {
        //sum total winnable amount
        let maxPrize = prizeValues.reduce(function(a, b) {
            return a + b
        })
        
        //sum eliminated values
        let eliminatedAmount = eliminatedValues.reduce(function(x,y){
            return x + y
        })

        //calculate offer
        let offerValue = Math.round((maxPrize - eliminatedAmount) / casesLeftToOpen)
        console.log(offerValue)
        setBankOffer(offerValue)
    }


    //declare players decision points

    
    //process whether player has accepted or rejected deal 


    //keep track of past offers

    
    //execute if player decides to switch cases

    //execute if player decides not to switch


    //calculate final winnings if player opens bonus case

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