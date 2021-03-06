import React, { useState, useEffect } from 'react'

import Briefcase from './Briefcase'
import BonusBriefcase from './BonusBriefcase'
import TurnCounter from './TurnCounter'
import Message from './Message'

import { recordScore } from '../services/game.service'

import { Box, Button, Container, Grid, GridItem, Spacer } from '@chakra-ui/react'

import { getCurrentUser } from '../services/auth.service'

const Game = () => {
    let [endOfGame, setEndOfGame] = useState(false)
    //count total interaction in game
    let [interactions, setInteractions] = useState(22)
    //total sum of briefcases
    let [totalAmount, setTotalAmount] = useState(0)
    //toggle board status
    let isOn = true
    //set state for board
    let [activeBoard, setActiveBoard] = useState(true)
    //set state for bank offer
    let [bankOffer, setBankOffer] = useState(0)
    //set state for player winnings
    let [winnings, SetWinnings] = useState(0)
    //set state for bonus round
    let [bonusRound, setBonusRound] = useState(false)
    //set state for bonus case contents
    let [bonusContents, setBonusContents] =useState('')
    //set state for score
    let [casesLeftToOpen, setCasesLeftToOpen] = useState(21)
    //set state for eliminated values
    let [eliminatedValues, setEliminatedValues] = useState([])
    //set state for array of briefcases to display on gameboard
    let [briefcaseArray, setBriefcaseArray] = useState([])
    //set state to display when user selects case
    let [userCaseToDisplay, setUserCaseToDisplay] = useState('Please select a case')

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
                numCases={casesLeftToOpen}
                userCase={setUserCase}
                briefcaseArray={shuffledCases}
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
            setBonusContents(bonusCase)
        }
        setBriefcaseArray(newArray)
    }, [])

    //briefcase values
    const prizeValues = [1, 5, 10, 25,  50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 1000000]
    //

    //ordered values
    const orderedValues = [1, 5, 10, 25,  50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 25000, 50000, 75000, 100000, 250000, 500000, 750000, 1000000]

    //bonus outcomes
    const bonusOutcomes = ['add 10k', 'double money', 'lose half', 'lose all']
    
    let isOffer = false
    //banker's offer
    let offerValue = 0
    // player's winnings
    let playerWinnings = 0
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
        }
        setBriefcaseArray([...briefcaseArray, ...newArray])
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
            bonusCaseHolder.push(bonusCase)   
        }
        setBriefcaseArray([...briefcaseArray, ...bonusCaseHolder])
    }

    //decrement cases to open
    const decrementCasesToOpen = () => {
        if(activeBoard){
            setCasesLeftToOpen(--casesLeftToOpen)
            bankerCalls()
        }
    }

    let selectedCase
    const setUserCase = (caseNumber, array) => {
        if(!selectedCase){
            selectedCase = caseNumber
            //const newSelectedCase = array.splice(caseNumber, 1)
            let valuesArray =[]
            let updatedArray = []
            setUserCaseToDisplay(<Briefcase 
                value = {array[caseNumber]}
                id = {eval(caseNumber)}
                key = {caseNumber}
                counter= {decrementCasesToOpen}
                eliminateCase={trackEliminatedValues}
                turn={turnInfo}
                numCases={casesLeftToOpen}
                briefcaseArray={[]}
            />
            )
            for(let i = 0; i < array.length; i++) {
                let newCase = <Briefcase 
                    value = {array[i]}
                    id = {i}
                    key = {i}
                    counter= {decrementCasesToOpen}
                    eliminateCase={trackEliminatedValues}
                    turn={turnInfo}
                    numCases={casesLeftToOpen}
                    userCase={setUserCase}
                />
                if(i === array.length-1){
                    newCase= <BonusBriefcase 
                    value = {shuffledBonusCases[0]}
                    id = {'bonus'}
                    key = {'bonus'}
                    />
                }
                updatedArray.push(newCase)
                valuesArray.push(newCase.props.value)
            }
            valuesArray.pop()
            setBriefcaseArray(updatedArray)
            calcCaseSum(valuesArray)
            //SetWinnings(totalAmount-caseSum)
        }
        return(
            <div>
                <Box>
                    {selectedCase}
                </Box>
            </div>
        )
    }

    //track eliminted values
    const trackEliminatedValues = (value) => {
        let values = eliminatedValues
        if(casesLeftToOpen < 21) {
            values.push(value)
            setEliminatedValues(values)
        }
    }

    //declare when banker will call
    const bankerCalls = () => {
        setInteractions(interactions --)
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
            calculateOffer()
            
        }
    }

    const calcCaseSum = (array) => {
        let playersValue = array.reduce(function(a,b){
            return a + b
        })
        let sumOfCases = orderedValues.reduce(function(a,b){
            return a + b
        })
        setTotalAmount(sumOfCases-playersValue)
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
        setBankOffer(offerValue)
        return bankOffer
    }

    //declare players decision points
    //process whether player has accepted or rejected deal
    const dealOrNoDeal = (event) => {
        const buttonText = event.target.innerText
        if(buttonText==='Deal'){
            setBonusRound(true)
            playerAccepts()
        } else if(buttonText==='No Deal'){
            handleLastUnopenedCase()
        }
    }

    const handleLastUnopenedCase = () => {
        if(casesLeftToOpen > 1) {
            isOn=true
            setActiveBoard(true)
        } else {
            //set winnings
            playerWinnings = totalAmount
            SetWinnings(totalAmount)
            let sumPrize = prizeValues.reduce(function(a, b) {
                return a + b
            })
        }
    }

    const handleBonusRound = (event) => {
        const buttonText = event.target.innerText
        if(buttonText==='Deal'){
            calculateBonus()
        }
        else if(buttonText==='No Deal'){
            scoreWithoutBonus()
        }
    }

    
    //execute if player accepts deal
    const playerAccepts = () => {
        playerWinnings = bankOffer
        SetWinnings(playerWinnings)
        return winnings
    }

    //calculate final winnings if player opens bonus case
    const calculateBonus = () => {
        const bonusCase = briefcaseArray[briefcaseArray.length-1]
        const outcome = bonusCase.props.value
        let finalWinnings
        if(outcome === 'add 10k') {
            finalWinnings = winnings + 10000
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            //return winnings
        } else if(outcome === 'double money') {
            finalWinnings = winnings * 2
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            //return winnings
        } else if(outcome === 'lose half') {
            finalWinnings = winnings / 2
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
            //return winnings
        } else if(outcome === 'lose all') {
            finalWinnings = 0
            playerWinnings = finalWinnings
            SetWinnings(finalWinnings)
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
        recordScore(user_id, score)
        setEndOfGame(true)

    }

    const scoreWithoutBonus = () => {
        const currentUser = getCurrentUser()
        const user_id = currentUser.data.id
        let score = playerWinnings
        recordScore(user_id, score)
        setEndOfGame(true)
    }

    //start new game
    const startNewGame = (event) => {
        window.location.reload()
    }

    return(
        
        <div>
            <Box
                position='fixed'
                w='100%'
                top={32}
                bg='#b29ce5'
                color='white'
            >
                <Grid
                    templateColumns="repeat(5, 1fr)"
                    gap={8}
                    p={8}
                    mt={0}
                >
                    <GridItem colSpan={1}>
                        Your case: {userCaseToDisplay}
                    </GridItem>
                    <Spacer />
                    <GridItem
                        colSpan={3}textAlign='center'
                        p={6}
                    >
                        <Message
                        bankOffer = {bankOffer}
                        interactions = {interactions}
                        casesLeftToOpen= {casesLeftToOpen}
                        winnings = {winnings}
                        bonusRound = {bonusRound}
                        endOfGame = {endOfGame}
                        bonusContents = {bonusContents}
                        userCaseContents = {totalAmount}
                        />
                    </GridItem>
                </Grid>
                <Box
                    padding='0.2rem'
                    width='20%'
                    textAlign='center'
                >
                    Cases left to open {turnInfo()}
                </Box>
                {activeBoard || endOfGame ? (
                    <Container
                        mb={2}
                        centerContent
                    >
                        <Button
                            label='New Game'
                            onClick={startNewGame}
                            colorScheme='red'
                        >
                            New Game
                        </Button>
                    </Container>
                    ) : (
                        <>
                            <Box
                                d='flex'
                                alignItems='center'
                                justifyContent='space-around'
                                mb={2}
                            >
                                {!bonusRound && !endOfGame && (
                                    <>
                                        <Button
                                            label='Deal'
                                            onClick={dealOrNoDeal}
                                            colorScheme='green'
                                        >
                                            Deal
                                        </Button>
                                        <Button
                                            label='No Deal'
                                            onClick={dealOrNoDeal}
                                            colorScheme='yellow'
                                        >
                                            No Deal
                                        </Button>
                                        <Button
                                            label='New Game'
                                            onClick={startNewGame}
                                            colorScheme='red'
                                        >
                                            New Game
                                        </Button>
                                    </>
                                )}
                                {bonusRound && !endOfGame && (
                                    <>
                                        <Button
                                            label='Deal'
                                            onClick={handleBonusRound}
                                            colorScheme='green'
                                        >
                                            Deal
                                        </Button>
                                        <Button
                                            label='No Deal'
                                            onClick={handleBonusRound}
                                            colorScheme='yellow'
                                        >
                                            No Deal
                                        </Button>
                                        <Button
                                            label='New Game'
                                            onClick={startNewGame}
                                            colorScheme='red'
                                        >
                                            New Game
                                        </Button>
                                    </>
                                )}
                    
                            </Box>
                        </>
                
                    )
                }
            </Box>
            <Box mt={96}>
                <Grid
                    templateColumns="repeat(5, 1fr)"
                    gap={8}
                    p={8}
                    mt={8}
                >
                    <GridItem colSpan={1}>
                        <Box alignItems='center' p={8}>
                        <strong>Prize Values</strong>
                        {orderedValues.sort(function(a, b){return a-b}).map(prize => {return <Box d='flex' key={prize}>${new Intl.NumberFormat().format(parseInt(prize))}</Box>})}
                        </Box>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Box alignItems='center'>
                            {briefcaseArray.map(briefcase => {return briefcase})}
                        </Box>
                    </GridItem>
                    
                </Grid>
            </Box>
        </div>
    )
}

export default Game