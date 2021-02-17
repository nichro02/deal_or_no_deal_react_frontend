
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box 

} from '@chakra-ui/react'

const Message = (props) => {
    console.log(props)
    // const { isOpen, onOpen, onClose } = useDisclosure()

    if(props.casesLeftToOpen === 15
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
                You won!${new Intl.NumberFormat().format(parseInt(props.bankOffer))}. Do you want to play the bonus round?
            </Box>
        )
    }

    
    
    else {return null}

        // <Modal isOpen={isOpen} onClose={onClose}>
        //     <ModalOverlay />
        //     <ModalContent>
        //         <ModalHeader></ModalHeader>
        //         <ModalCloseButton />
        //         <ModalBody>
        //             Text of modal
        //         </ModalBody>
        //     </ModalContent>
        // </Modal>
        
    
}

export default Message