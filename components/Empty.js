import { Flex, Text, Image, Button } from "@chakra-ui/react";

const Empty = () => {
  return (
    <>
      <Flex direction="column" align="center">
        <Image
          src="undraw_To_do_list_re_9nt7.svg"
          width={[300, 300, 400]}
          height={300}
        />
        <Text fontSize={["md", "md", "lg"]} fontWeight="500">
          All clear
        </Text>
        <Text color="gray.400" fontSize={["sm", null, "md"]}>
          You have an empty task list at the moment.
        </Text>
        <Button
          mt={4}
          textStyle="white"
          layerStyle="reg"
          _hover={{ layerStyle: "hover" }}
          _focus=""
        >
          Add a task
        </Button>
      </Flex>
    </>
  );
};

export default Empty;
