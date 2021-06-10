import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const fontSize = {
  base: "sm",
  md: "md",
};

const DeleteModal = ({ modalBody, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        size="sm"
        _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
        _focus=""
        onClick={onOpen}
        aria-label="remove todo"
        icon={<FaTrash />}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "xs", md: "sm" }}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <ModalBody pt={6} fontSize={["sm", null, "md"]}>
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
