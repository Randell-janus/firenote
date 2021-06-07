import firebase from "firebase";
import { auth } from "../firebase/firebase";
import { Container, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import Title from "./Title";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
const buttonFontSize = {
  sm: "sm",
  md: "lg",
};

export default function Hero() {
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
          <Button
            px={9}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.200" }}
            _focus={{ bg: "orange.400" }}
            fontSize={buttonFontSize}
            leftIcon={<FaGoogle />}
            onClick={signInWithGoogle}
          >
            Get Started
          </Button>
          <Link href="https://github.com/Randell-janus/next.js-firebase">
            <Button
              variant="outline"
              fontSize={buttonFontSize}
              leftIcon={<FaGithub />}
            >
              View Source
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
