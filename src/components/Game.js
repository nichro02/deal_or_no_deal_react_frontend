import React, { useState, useEffect } from 'react'

import Briefcase from './Briefcase'
import BonusBriefcase from './BonusBriefcase'

import { Box } from '@chakra-ui/react'

const Game = () => {
    //toggle board status
    let isOn = true
    //bonus round
    let bonusRound = false
    //set state for board
    let [activeBoard, setActiveBoard] = useState(true)
    //set state for bank offer
    let [bankOffer, setBankOffer] = useState(0)
    //set state for bonus round
    //let [bonusRound, setBonusRound] = useState(false)
    //set state for score
    let [casesLeftToOpen, setCasesLeftToOpen] = useState(22)
    //set state for user case
    let [userSelectedCase, setUserSelectedCase] = useState()
    //set state for eliminated values
    let [eliminatedValues, setEliminatedValues] = useState([])
    //set state for array of briefcases to display on gameboard
    let [briefcaseArray, setBriefcaseArray] = useState([])
    


    useEffect(() => {
        let newArray = []
        for(let i = 0; i < shuffledCases.length; i++) {
            let newCase = <Briefcase 
                value = {shuffledCases[i]}
                id = {i}
                key = {i}
                counter= {decrementCasesToOpen}
                eliminateCase={trackEliminatedValues}
            />
            newArray.push(newCase)

        }
        
        for(let i = 0; i < 1; i++) {
            let bonusCase = <BonusBriefcase 
                value = {shuffledBonusCases[i]}
                id = {'bonus'}
                key = {'bonus'}
            />
            
            newArray.push(bonusCase)
        }
        setBriefcaseArray(newArray)
    }, [])

    useEffect(() => {
        console.log('BOARD STATUS', activeBoard)
    },[activeBoard])

    //briefcase values
    const prizeValues = [1, 5, 10, 25,  50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 1000000]

    //bonus outcomes
    const bonusOutcomes = ['add 10k', 'double money', 'lose half', 'lose all']
    //banker's offer
    let offerValue = 0
    // player's winnings
    let playerWinnings = 0
    // holding array to return briefcases
    //let briefcaseArray = []
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
        let newArray = []
        for(let i = 0; i < shuffledCases.length; i++) {
            let newCase = <Briefcase 
                value = {shuffledCases[i]}
                id = {i}
                key = {i}
                counter= {decrementCasesToOpen}
                eliminateCase={trackEliminatedValues}
            />
            newArray.push(newCase)
            //setBriefcaseArray([...briefcaseArray, newCase])
            //console.log(shuffledCases)
            //console.log(newCase)
            //console.log(briefcaseArray)
        }
        //return briefcaseArray
        
        setBriefcaseArray([...briefcaseArray, ...newArray])
        console.log(briefcaseArray)
    }

    //create bonus case
    const createBonusCase = () => {
        createBriefcases()
        //shufflePrizes(bonusOutcomes)
        let bonusCaseHolder = []
        for(let i = 0; i < 1; i++) {
            let bonusCase = <BonusBriefcase 
                value = {shuffledBonusCases[i]}
                id = {'bonus'}
                key = {'bonus'}
            />
            //briefcaseArray.push(bonusCase)
            bonusCaseHolder.push(bonusCase)
            
            console.log(bonusCase)
        }
        setBriefcaseArray([...briefcaseArray, ...bonusCaseHolder])
        //console.log(briefcaseArray)
        //return briefcaseArray
    }

    
    const setBoard = () => {
        //console.log(briefcaseArray)
        return briefcaseArray.map(briefcase => <Box>{briefcase}</Box>)
    }


    //decrement cases to open
    const decrementCasesToOpen = () => {
        //let response = await activeBoard
        //console.log('----->',activeBoard)
        //console.log('-_-___-', response)
        if(casesLeftToOpen === 22){
            setCasesLeftToOpen(casesLeftToOpen--)
        }
        if(isOn === true){
            bankerCalls()
            setCasesLeftToOpen(casesLeftToOpen--)
            
        }
    }

    //track eliminted values
    const trackEliminatedValues = (value) => {
        console.log(casesLeftToOpen)
        let values = eliminatedValues
        if(casesLeftToOpen < 22) {
            values.push(value)
            setEliminatedValues(values)
            console.log(eliminatedValues)
        }
        
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
            isOn = false
            //setActiveBoard(false)
            console.log('BANKER CALLS',casesLeftToOpen,'TO OPEN' )
            //console.log(activeBoard)
            calculateOffer()
            //dealOrNoDeal()
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

    const dealOrNoDeal = (event) => {
        //need to create buttons
        if(event.target==='Deal' && bonusRound === false){
            console.log('User accepts offer. Send to Bonus Round')
            bonusRound=true
        } else if(event.target==='No Deal' && bonusRound === false){
            console.log('User rejects offer. Reactivate board and keep playing')
            isOn=true
        } else if(event.target==='Deal' && bonusRound === true){
            bonusRound=true
        } else if(event.target==='No Deal' && bonusRound === false){
            isOn=true
        }
    }


    //keep track of past offers

    
    //execute if player decides to switch cases

    //execute if player decides not to switch


    //calculate final winnings if player opens bonus case

    return(
        
        <div>
            <div>
                Your case: {userSelectedCase}
            </div>
            <div>
                Cases left to open: {casesLeftToOpen}
            </div>
            {briefcaseArray.map(briefcase => {return briefcase})}
        </div>
    )
}

export default Game