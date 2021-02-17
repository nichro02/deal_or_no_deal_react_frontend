
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure 

} from '@chakra-ui/react'

const Message = (props) => {
    console.log(props)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Text of modal
                </ModalBody>
            </ModalContent>
        </Modal>
        
    )
}

export default Message