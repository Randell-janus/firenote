import firebase from "firebase";
import { auth } from "../firebase/firebase";
import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        height="100vh"
        align={"center"}
        justify="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={700}
          fontSize={{ base: "3xl", sm: "7xl", md: "8xl" }}
          lineHeight={"30%"}
        >
          fire
          <Text as={"span"} color={"orange.400"}>
            note
          </Text>
        </Heading>

        <Text py={6} color={"gray.500"} fontSize={{ sm: "md", md: "xl" }}>
          Got an idea? Take a quick firenote!
        </Text>

        <Stack spacing={4} direction={"column"}>
          <Button
            rounded="lg"
            fontSize={{ sm: "sm", md: "md" }}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
            leftIcon={<FaGoogle />}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
          <Button
            rounded="lg"
            fontSize={{ sm: "sm", md: "md" }}
            variant="outline"
            leftIcon={<FaGithub />}
          >
            <Link href="https://github.com/Randell-janus/next.js-firebase">
              <a>View Source</a>
            </Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
