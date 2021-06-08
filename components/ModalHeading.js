import {
  ModalHeader,
  ModalCloseButton,
  CircularProgress,
} from "@chakra-ui/react";

const fontSize = {
  sm: "sm",
  md: "md",
};
const ModalHeading = () => {
  return (
    <>
      <ModalHeader display="flex" fontSize={fontSize}>
        <CircularProgress
          isIndeterminate
          color="orange.400"
          size={{ sm: "4", md: "6" }}
          mr={{ sm: "1", md: "2" }}
          mt={{ sm: "1", md: "0" }}
        />
        editing...
      </ModalHeader>
      <ModalCloseButton _focus="" />
    </>
  );
};

export default ModalHeading;
