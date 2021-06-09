import {
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const fontSize = {
  sm: "sm",
  md: "md",
};

const DeleteModal = ({ modalBody, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        size="sm"
        bg="gray.200"
        _hover={{ bg: "gray.300" }}
        _focus={{ bg: "gray.200" }}
        className="remove-todo"
        onClick={onOpen}
        aria-label="remove todo"
        icon={<FaTrash />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{ sm: "xs", md: "sm" }}>
          <ModalBody pt={6} fontSize={fontSize}>
            {modalBody}
          </ModalBody>
          <ModalFooter>
            <Button
              fontSize={fontSize}
              variant="ghost"
              mr={3}
              _focus=""
              onClick={onClose}
            >
              Cancel
            </Button>
            {children}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
