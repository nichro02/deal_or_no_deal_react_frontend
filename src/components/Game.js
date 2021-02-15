import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Briefcase from './Briefcase'
import BonusBriefcase from './BonusBriefcase'
import TurnCounter from './TurnCounter'

import { recordScore } from '../services/game.service'

import { Box, Button, Container } from '@chakra-ui/react'

import { getCurrentUser } from '../services/auth.service'


const Game = () => {
    //count total interaction in game
    let interactions = 22
    //toggle board status
    let isOn = true
    //bonus round
    let bonusRound = false
    //set state for board
    let [activeBoard, setActiveBoard] = useState(true)
    //set state for bank offer
    let [bankOffer, setBankOffer] = useState(0)
    //set state for player winnings
    let [winnings, SetWinnings] = useState(0)
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
                turn={turnInfo}
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
    
    let isOffer = false
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

    //send Turn Counter info
    const turnInfo = () => {
        return <TurnCounter 
            casesLeft={casesLeftToOpen}
            boardStatus={activeBoard}

        />
    }

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

    //decrement cases to open
    const decrementCasesToOpen = () => {
        //let response = await activeBoard
        //console.log('----->',activeBoard)
        //console.log('-_-___-', response)
        if(activeBoard){
            setCasesLeftToOpen(--casesLeftToOpen)
            bankerCalls()
            
            
        }
    }
    

    //track eliminted values
    const trackEliminatedValues = (value) => {
        //console.log(casesLeftToOpen)
        let values = eliminatedValues
        if(casesLeftToOpen < 22) {
            values.push(value)
            setEliminatedValues(values)
            //console.log(eliminatedValues)
        }
        
    }

    //declare when banker will call
    const bankerCalls = () => {
        interactions --
        console.log(interactions)
        if(interactions === 16
            || interactions === 12
            || interactions === 8
            || interactions === 6
            || interactions === 4
            || interactions === 2
            || interactions === 1    
        ) {
            isOn = false
            setActiveBoard(false)
            console.log('BANKER CALLS',casesLeftToOpen,'TO OPEN' )
            console.log(isOn)
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
        offerValue = Math.round((maxPrize - eliminatedAmount) / casesLeftToOpen)
        console.log(offerValue)
        setBankOffer(offerValue)
        return bankOffer
    }

    //declare players decision points
    //process whether player has accepted or rejected deal

    const dealOrNoDeal = (event) => {
        console.log(event.target.innerText)
        const buttonText = event.target.innerText
        if(buttonText==='Deal' && bonusRound === false){
            console.log('Send to Bonus Round')
            bonusRound=true
            playerAccepts()
        } else if(buttonText==='No Deal' && bonusRound === false){
            console.log('User rejects offer. Reactivate board and keep playing')
            isOn=true
            setActiveBoard(true)
            
        } else if(buttonText==='Deal' && bonusRound === true){
            calculateBonus()
            
            
        } else if(buttonText==='No Deal' && bonusRound === true){
            sendScore()
        }
    }
    
    //execute if player accepts deal
    const playerAccepts = () => {
        console.log(bankOffer)
        playerWinnings = bankOffer
        console.log(playerWinnings)
        SetWinnings(playerWinnings)
        
        console.log('Player won', playerWinnings)
        return winnings
    }

    //calculate final winnings if player opens bonus case
    const calculateBonus = () => {
        const bonusCase = briefcaseArray[briefcaseArray.length-1]
        const outcome = bonusCase.props.value
        let finalWinnings
        console.log(outcome)
        if(outcome === 'add 10k') {
            console.log('add 10k')
            finalWinnings = winnings + 10000
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            console.log(winnings)
            //return winnings
        } else if(outcome === 'double money') {
            console.log('double money')
            finalWinnings = winnings * 2
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            console.log(winnings)
            //return winnings
        } else if(outcome === 'lose half') {
            console.log('lose half')
            finalWinnings = winnings / 2
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            console.log(winnings)
            //return winnings
        } else if(outcome === 'lose all') {
            console.log('lose all')
            finalWinnings = 0
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            console.log(winnings)
            //return winnings
        }
        sendScore()
    }

    //record score
    const sendScore = () => {
        //get user id
        //get score
        
        const currentUser = getCurrentUser()
        const id = currentUser.data.id
        let user_id = id
        let score = playerWinnings
        console.log(score)
        recordScore(user_id, score)
    }

    //start new game
    const startNewGame = (event) => {
        window.location.reload()
    }

    return(
        
        <div>
            <div>
                Your case:
            </div>
            <Box padding='0.5rem' width='20%' textAlign='center'>
                Cases left to open {turnInfo()}
            </Box>
            {activeBoard ? (
                <div>
                    <Button label='New Game' onClick={startNewGame}>New Game</Button>
                </div>
            ) : (
                <div>
                    <Button label='Deal' onClick={dealOrNoDeal}>Deal</Button>
                    <Button label='No Deal' onClick={dealOrNoDeal}>No Deal</Button>
                    <Button label='New Game' onClick={startNewGame}>New Game</Button>
                </div>
            )
            }
            <Box alignItems='center'>
            {briefcaseArray.map(briefcase => {return briefcase})}
            </Box>
        </div>
    )
}

export default Game