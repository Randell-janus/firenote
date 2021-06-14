import { auth } from "../firebase/firebase";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiSpyLine } from "react-icons/ri";

const signInAsGuest = () => {
  auth.signInAnonymously();
};
const AnonModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        my={3}
        colorScheme="white"
        bg={useColorModeValue("gray.900", "gray.200")}
        _hover={{ bg: useColorModeValue("gray.700", "gray.300") }}
        _focus=""
        leftIcon={<RiSpyLine />}
        onClick={onOpen}
      >
        Sign in as Guest
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={["xs", "xs", "sm"]}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <ModalHeader display="flex">
            <Flex align="center">
              <RiSpyLine />
            </Flex>
            <Flex ml={2} fontSize={["md", "md", "lg"]}>
              Anonymous Login
            </Flex>
          </ModalHeader>
          <ModalCloseButton _focus="" />
          <ModalBody textAlign="justify" fontSize={["sm", null, "md"]}>
            Feel free to create some task and test out the Create, Read, Update,
            and Delete functionality of the app. Note that you will lose access
            to any created task once you sign out as a guest.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} _focus="" onClick={onClose}>
              Cancel
            </Button>
            <Button
              layerStyle="reg"
              color="white"
              // _hover={{ bg: "red.400" }}
              _hover={{ layerStyle: "hover" }}
              _focus=""
              onClick={signInAsGuest}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnonModal;
