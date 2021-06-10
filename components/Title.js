import { Heading, Text } from "@chakra-ui/react";

const FirenoteLogo = () => {
  return (
    <>
      <Heading fontSize={{ base: "5xl", md: "7xl" }}>🔥</Heading>
      <Heading
        fontWeight={700}
        // fontSize={{ base: "7xl", md: "8xl" }}
        fontSize={['7xl','7xl','8xl']}
        lineHeight={"30%"}
        textDecoration="underline"
      >
        fire
        <Text as={"span"} color={"orange.400"}>
          note
        </Text>
      </Heading>
      <Text py={6} color={"gray.500"} fontSize={['md','md','xl']}>
        Got an idea? Take a quick firenote!
      </Text>
    </>
  );
};

export default FirenoteLogo;
