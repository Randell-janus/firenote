import {
  ModalHeader,
  ModalCloseButton,
  CircularProgress,
} from "@chakra-ui/react";

const fontSize = {
  base: "sm",
  md: "md",
};
const ModalHeading = () => {
  return (
    <>
      <ModalHeader display="flex" fontSize={fontSize}>
        <CircularProgress
          isIndeterminate
          color="orange.400"
          size={{ base: "4", md: "6" }}
          mr={{ base: "1", md: "2" }}
          mt={{ base: "1", md: "0" }}
        />
        editing...
      </ModalHeader>
      <ModalCloseButton _focus="" />
    </>
  );
};

export default ModalHeading;
