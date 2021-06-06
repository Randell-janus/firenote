import firebase from "firebase";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export default function Navbar() {
  const [user] = useAuthState(auth);
  const signOut = () => auth.signOut();
  return (
    <>
      <Box bg={useColorModeValue("orange.400", "gray.900")}>
        {/* Main flex container */}
        <Flex
          align={"center"}
          justify={"space-between"}
          maxW={{ sm: "sm", md: "2xl" }}
          mx="auto"
          h={16}
        >
          <Heading size="lg">🔥</Heading>
          <Button
            size="sm"
            variant={"solid"}
            bg={"gray.50"}
            _hover={{ bg: "gray.200" }}
            _focus={{ bg: "gray.50" }}
            color={"orange.400"}
            fontSize="sm"
            leftIcon={user ? <BiLogOut /> : <AiOutlineGoogle />}
            onClick={user ? signOut : signInWithGoogle}
          >
            {user ? "Sign out" : "Sign in"}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
