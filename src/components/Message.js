
import { Box } from '@chakra-ui/react'

const Message = (props) => {
    console.log(props)
    if(props.endOfGame === true){
        return(
            <Box>
                Nice game, you won!${new Intl.NumberFormat().format(parseInt(props.winnings))}! Hit the New Game button if you want to continue playing
            </Box>
        )
    }
    if(props.bonusRound===true){
        return(
            <Box>
                You won ${new Intl.NumberFormat().format(parseInt(props.bankOffer))} and your case contained${new Intl.NumberFormat().format(parseInt(props.userCaseContents))}! Do you want to play in the bonus round?
            </Box>
        )
    } else if(props.casesLeftToOpen === 15
        || props.casesLeftToOpen === 11
        || props.casesLeftToOpen === 7
        || props.casesLeftToOpen === 5
        || props.casesLeftToOpen === 3
    ){
        return( 
            <Box>
                The banker called with an offer of ${new Intl.NumberFormat().format(parseInt(props.bankOffer))}. Deal or No Deal?
            </Box>
        )
    } else if(props.casesLeftToOpen === 1){
        return(
            <Box>
                The banker called with an offer of ${new Intl.NumberFormat().format(parseInt(props.bankOffer))}. Do you want to take the deal? If not, click no deal and tap the last briefcase to see what's inside.
            </Box>
        )
    } else if(props.casesLeftToOpen ===0){
        return(
            <Box>
                You won!${new Intl.NumberFormat().format(parseInt(props.winnings))}! Do you want to play the bonus round?
            </Box>
        )
    } else {return null}
}

export default Message