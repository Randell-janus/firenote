import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import {
  Container,
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
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDots, BsCircle, BsCheckCircle } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

const Todo = ({ id, complete, text, content }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [body, setBody] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };
  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };
  const onUpdateTodo = (e) => {
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

        <AccordionPanel
          fontSize={["sm", null, "md"]}
          // display="flex"
          // justifyContent="space-between"
        >
          <VStack>
            <Flex alignItems="center">
              {/* <Flex maxW={["xs", null, "xl"]} align="center"> */}
              <Text
                cursor="pointer"
                as="span"
                onClick={() => onCompleteTodo(id, complete)}
              >
                {complete ? <BsCheckCircle /> : <BsCircle />}
              </Text>
              <Container w={["2xs", null, "xl"]} py={2}>
                {content}
              </Container>
              {/* </Flex> */}
              <Menu>
                {/* <Flex align="center"> */}
                <MenuButton aria-label="Options" mr={0.5}>
                  <BsThreeDots cursor="pointer" />
                </MenuButton>
                {/* </Flex> */}
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
                    Editing guide
                  </MenuItem>
                  <MenuItem icon={<FaTrash />} onClick={() => onDeleteTodo(id)}>
                    Delete task
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Container
              display="flex"
              alignItems="center"
              maxW={["xs", null, "xl"]}
              justifyContent="center"
              cursor="pointer"
              _hover={{ textStyle: "reg" }}
              color="gray.400"
            >
              <MdAdd />
              <Text ml={2} fontWeight="500" fontSize={["sm", null, "md"]}>
                Add task
              </Text>
            </Container>
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
          <ModalBody fontSize={["sm", null, "md"]}>
            You can edit the task title and content by clicking the text itself.
          </ModalBody>
          <ModalFooter>
            <Button layerStyle="reg" color="white" _focus="" onClick={onClose}>
              Got it!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Todo;
