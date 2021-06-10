import { Heading, Text, useColorModeValue } from "@chakra-ui/react";

const FirenoteLogo = () => {
  return (
    <>
      <Heading
        fontWeight={700}
        fontSize={["7xl", "7xl", "8xl"]}
        lineHeight={"30%"}
        textDecoration="underline"
        color={useColorModeValue('gray.800', 'gray.200')}
      >
        fire
        <Text as={"span"} textStyle="reg">
          note
        </Text>
      </Heading>
      <Text py={6} color={"gray.500"} fontSize={["md", "md", "xl"]}>
        Got an idea? Take a quick firenote!
      </Text>
    </>
  );
};

export default FirenoteLogo;
