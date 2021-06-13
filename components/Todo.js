import { useState, useRef } from "react";
import { auth, firestore } from "../firebase/firebase";
import {
  Container,
  Box,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  Input,
  Tooltip,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDots, BsCircle, BsCheckCircle } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";

const Todo = ({ id, complete, text, content }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const initRef = useRef();
  const [editedTodo, setEditedTodo] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };
  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };
  const onUpdateTitle = (e) => {
    e.preventDefault();
    setEditedTodo("");
    todosRef
      .doc(id)
      .update({
        text: editedTodo,
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onUpdateBody = (e) => {
    e.preventDefault();
    setEditedBody("");
    todosRef
      .doc(id)
      .update({
        content: editedBody,
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <AccordionItem>
        <AccordionButton _focus="">
          <Text
            flex="1"
            textAlign="left"
            color={useColorModeValue("gray.800", "gray.50")}
            fontWeight="500"
            fontSize={["sm", null, "md"]}
          >
            {text}
          </Text>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel fontSize={["sm", null, "md"]}>
          <VStack>
            <Flex alignItems="center">
              <Text
                cursor="pointer"
                as="span"
                onClick={() => onCompleteTodo(id, complete)}
              >
                {complete ? <BsCheckCircle /> : <BsCircle />}
              </Text>
              <Popover initialFocusRef={initRef}>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Container w={["2xs", null, "xl"]} py={2}>
                        <Tooltip
                          hasArrow
                          arrowSize={6}
                          label="click to edit"
                          bg={useColorModeValue("gray.700", "gray.200")}
                        >
                          {content}
                        </Tooltip>
                      </Container>
                    </PopoverTrigger>
                    <PopoverContent
                      bg={useColorModeValue("gray.50", "gray.800")}
                      w={["2xs", null, "sm"]}
                    >
                      <PopoverCloseButton _focus="" />
                      <PopoverHeader fontWeight="500">
                        Edit task details
                      </PopoverHeader>
                      <PopoverBody p={3}>
                        <form onSubmit={onUpdateBody}>
                          <Textarea
                            p={1}
                            ref={initRef}
                            _focus=""
                            variant="Unstyled"
                            placeholder={content}
                            bg={useColorModeValue("gray.50", "gray.800")}
                            fontSize={["sm", null, "md"]}
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                          ></Textarea>
                          <Button
                            size="sm"
                            textStyle="white"
                            layerStyle="reg"
                            _hover={{ layerStyle: "hover" }}
                            fontSize={["sm", null, "md"]}
                            _focus=""
                            mr={4}
                            type="submit"
                            onClick={onClose}
                          >
                            Save
                          </Button>
                        </form>
                      </PopoverBody>
                    </PopoverContent>
                  </>
                )}
              </Popover>

              <Menu>
                <MenuButton aria-label="Options" mr={0.5}>
                  <BsThreeDots cursor="pointer" />
                </MenuButton>
                <MenuList
                  fontSize={["xs", null, "sm"]}
                  bg={useColorModeValue("gray.50", "gray.800")}
                >
                  <MenuItem
                    icon={complete ? <BsCheckCircle /> : <BsCircle />}
                    onClick={() => onCompleteTodo(id, complete)}
                  >
                    Mark status
                  </MenuItem>
                  <MenuItem icon={<FaEdit />} onClick={onOpen}>
                    Edit task title
                  </MenuItem>
                  <MenuItem
                    icon={<BiHelpCircle />}
                    onClick={() =>
                      toast({
                        duration: 9000,
                        isClosable: true,
                        render: () => (
                          <Box
                            color="white"
                            p={4}
                            bg="blue.300"
                            rounded="md"
                            maxW={["2xs", null, "sm"]}
                          >
                            Edit the task content by clicking the text itself
                          </Box>
                        ),
                      })
                    }
                  >
                    Help
                  </MenuItem>
                  <MenuItem icon={<FaTrash />} onClick={() => onDeleteTodo(id)}>
                    Delete task
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </VStack>
        </AccordionPanel>
      </AccordionItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={["xs", "xs", "sm"]}
          bg={useColorModeValue("gray.50", "gray.800")}
          py={2}
        >
          <ModalHeader fontSize={["md", null, "lg"]}>Edit title</ModalHeader>
          <ModalCloseButton _focus="" />
          <form onSubmit={onUpdateTitle}>
            <ModalBody>
              <Input
                _focus=""
                variant="Flushed"
                placeholder={text}
                value={editedTodo}
                required
                fontSize={["sm", null, "md"]}
                bg={useColorModeValue("gray.50", "gray.800")}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                type="submit"
                layerStyle="reg"
                color="white"
                _focus=""
                onClick={onClose}
                fontSize={["sm", null, "md"]}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Todo;
