import { Box } from '@chakra-ui/react'

const Message = (props) => {
    if(props.endOfGame === true){
        return(
            <Box>
                Nice game, you won<strong> ${new Intl.NumberFormat().format(parseInt(props.winnings))}</strong>! The bonus case contained <strong>{props.bonusContents.props.value}</strong>. Hit the New Game button if you want to continue playing
            </Box>
        )
    } else if(props.bonusRound===true && props.casesLeftToOpen > 0){
        return(
            <Box>
                You won <strong>${new Intl.NumberFormat().format(parseInt(props.bankOffer))}</strong> and your case contained <strong>${new Intl.NumberFormat().format(parseInt(props.userCaseContents))}</strong>! Do you want to play in the bonus round?
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
                The banker called with an offer of <strong>${new Intl.NumberFormat().format(parseInt(props.bankOffer))}</strong>. Deal or No Deal?
            </Box>
        )
    } else if(props.casesLeftToOpen === 1){
        return(
            <Box>
                The banker called with an offer of <strong>${new Intl.NumberFormat().format(parseInt(props.bankOffer))}</strong>. Do you want to take the deal? If not, click no deal and tap the last briefcase to see what's inside.
            </Box>
        )
    } else if(props.casesLeftToOpen ===0){
        return(
            <Box>
                You won <strong>${new Intl.NumberFormat().format(parseInt(props.userCaseContents))}</strong>! Do you want to play the bonus round?
            </Box>
        )
    } else {return null}
}

export default Message