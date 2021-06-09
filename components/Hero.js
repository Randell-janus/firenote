import firebase from "firebase";
import { auth } from "../firebase/firebase";
import {
  Container,
  Stack,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { RiSpyLine } from "react-icons/ri";
import Link from "next/link";
import Title from "./Title";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
const signInAsGuest = () => {
  auth.signInAnonymously();
};
const fontSize = {
  Regular: {
    sm: "sm",
    md: "md",
  },
  Header: {
    sm: "md",
    md: "xl",
  },
};

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      h="100vh"
      maxW="100%"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {/* Main stack */}
      <Stack
        height="80vh"
        align={"center"}
        justify="center"
        spacing={{ sm: 8, md: 10 }}
      >
        {/* Main stack child 1 */}
        <Title />
        {/* Main stack child 2 */}
        <Stack spacing={4} direction={"column"}>
          {/* Stack child button 1 */}
          <Button
            px={9}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.300" }}
            _focus={{ bg: "orange.400" }}
            fontSize={fontSize.Regular}
            leftIcon={<FaGoogle />}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
          {/* Stack child button 2 */}
          <Button
            colorScheme={"blackAlpha"}
            bg={"gray.800"}
            _hover={{ bg: "gray.700" }}
            _focus={{ bg: "gray.800" }}
            fontSize={fontSize.Regular}
            leftIcon={<RiSpyLine />}
            onClick={onOpen}
          >
            Sign in as Guest
          </Button>
          {/* Stack child button 3 */}
          <Link href="https://github.com/Randell-janus/next.js-firebase">
            <Button
              variant="outline"
              fontSize={fontSize.Regular}
              leftIcon={<FaGithub />}
            >
              View Source
            </Button>
          </Link>
        </Stack>
      </Stack>
      {/* Main modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={{ sm: "xs", md: "sm" }}>
          <ModalHeader display="flex" fontSize={fontSize.Header}>
            <Flex align="center">
              <RiSpyLine />
            </Flex>
            <Flex ml={2}>Anonymous Login</Flex>
          </ModalHeader>
          <ModalCloseButton _focus="" />
          <ModalBody fontSize={fontSize.Regular} textAlign="justify">
            Feel free to create some task and test out the CRUD functionality of
            the app. Note that you will lose access to any created task once you
            sign out as a guest.
          </ModalBody>
          <ModalFooter>
            <Button
              fontSize={fontSize.Regular}
              variant="ghost"
              mr={3}
              _focus=""
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.300" }}
              _focus={{ bg: "orange.400" }}
              fontSize={fontSize.Regular}
              onClick={signInAsGuest}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
