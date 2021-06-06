import { Heading, Text } from "@chakra-ui/react";

const FirenoteLogo = () => {
  return (
    <>
      <Heading fontSize={{ sm: "5xl", md: "7xl" }}>🔥</Heading>
      <Heading
        fontWeight={700}
        fontSize={{ base: "3xl", sm: "7xl", md: "8xl" }}
        lineHeight={"30%"}
        textDecoration="underline"
      >
        fire
        <Text as={"span"} color={"orange.400"}>
          note
        </Text>
      </Heading>
      <Text py={6} color={"gray.500"} fontSize={{ sm: "md", md: "xl" }}>
        Got an idea? Take a quick firenote!
      </Text>
    </>
  );
};

export default FirenoteLogo;
