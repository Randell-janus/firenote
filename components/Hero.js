import firebase from "firebase";
import { auth } from "../firebase/firebase";
import {
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { WiFire } from "react-icons/wi";
import Link from "next/link";
import AnonModal from "./AnonModal";

const signInWithGoogle = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
export default function Hero() {
  return (
    <Flex
      height="90vh"
      maxW="100%"
      align={"center"}
      justify="center"
      direction="column"
    >
      <Flex direction="column" align="center">
        <Heading
          fontWeight={700}
          fontSize={["5xl", "5xl", "6xl"]}
          maxW={{ base: "sm", md: "2xl" }}
          textDecoration="underline"
          textDecorationColor={useColorModeValue("gray.400", "gray.600")}
          textAlign="center"
          color={useColorModeValue("gray.800", "gray.200")}
        >
          Got an idea? Take a quick {""}
          <Text as="span" textStyle="reg">
            firenote
          </Text>
        </Heading>

        <Text
          pt={[6, 6, 8]}
          pb={[10, 10, 12]}
          color={"gray.500"}
          fontSize={["md", "md", "lg"]}
          textAlign="center"
          maxW={{ base: "2xs", md: "2xl" }}
        >
          A Note-taking application built with Next.js and Firebase
        </Text>
      </Flex>

      <Flex direction={"column"}>
        <Button
          px={9}
          layerStyle="reg"
          color="white"
          _hover={{ layerStyle: "hover" }}
          _focus=""
          leftIcon={<FaGoogle />}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>

        <AnonModal />

        <Link href="https://github.com/Randell-janus/next.js-firebase">
          <Button variant="outline" leftIcon={<FaGithub />} _focus="">
            View Source
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
