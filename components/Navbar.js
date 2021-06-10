import firebase from "firebase";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export default function Navbar() {
  const [user] = useAuthState(auth);
  const { colorMode, toggleColorMode } = useColorMode();

  const signOut = () => {
    setTimeout(() => {
      auth.signOut();
    }, 0);
  };
  return (
    <>
      <Box layerStyle="reg">
        {/* Main flex container */}
        <Flex
          align={"center"}
          justify="space-between"
          maxW={{ base: "sm", md: "2xl" }}
          mx="auto"
          h={14}
        >
          <IconButton
            onClick={toggleColorMode}
            size="sm"
            variant={"solid"}
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("gray.900", "gray.50")}
            _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
            icon={colorMode === "light" ? <RiMoonClearFill /> : <RiSunFill />}
            _focus=""
          />
          <Button
            size="sm"
            variant={"solid"}
            bg={useColorModeValue("gray.50", "gray.800")}
            color={useColorModeValue("gray.900", "gray.50")}
            _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
            _focus=""
            fontSize={{ base: "xs", md: "sm" }}
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
