import firebase from "firebase";
import { useState, useRef } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Container,
  Stack,
  Button,
  useColorModeValue,
  Input,
  Heading,
  Text,
  Textarea,
  Box,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaCheckSquare, FaEdit } from "react-icons/fa";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const onSubmitTodo = (event) => {
    event.preventDefault();
    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <Stack
      h="100%"
      w="100%"
      align={"center"}
      spacing={{ sm: 10, md: 12 }}
      py={{ sm: 12, md: 14 }}
    >
      {/* Main stack child 1 */}
      <Stack direction="column" align={"center"} spacing={{ sm: 4, md: 6 }}>
        <Heading fontSize={{ sm: "2xl", md: "4xl" }}>🔥</Heading>
        <Heading
          fontWeight={700}
          fontSize={{ sm: "4xl", md: "5xl" }}
          lineHeight={"30%"}
          textDecoration="underline"
        >
          fire
          <Text as={"span"} color={"orange.400"}>
            note
          </Text>
        </Heading>
      </Stack>
      {/* Main stack child 2 */}
      <Box
        w={{ sm: "sm", md: "2xl" }}
        bg={useColorModeValue("gray.50", "gray.900")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        {/* Box child 1 */}
        <form onSubmit={onSubmitTodo}>
          <Stack spacing={4} direction={{ sm: "column", md: "row" }} mb={8}>
            <Input
              w={{ sm: "auto", md: "lg" }}
              variant="flushed"
              required
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              fontSize={{ sm: "sm", md: "lg" }}
              placeholder={"Got an idea?"}
              type={"text"}
              color={useColorModeValue("gray.800", "gray.200")}
            />
            <Button
              type="submit"
              px={14}
              bg={"orange.400"}
              _hover={{ bg: "orange.200" }}
              _focus={{ bg: "orange.400" }}
              colorScheme={"orange"}
              fontSize={{ sm: "sm", md: "lg" }}
              leftIcon={<FaPencilAlt />}
            >
              Add to list
            </Button>
          </Stack>
        </form>
        {/* Box child 2 */}
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </Box>
    </Stack>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [editedTodo, setEditedTodo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };
  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };
  const onUpdateTodo = (e) => {
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
  return (
    <Flex
      p={{ sm: "6", md: "5" }}
      mt={4}
      key={id}
      align="center"
      justify="space-between"
      direction={{ sm: "column", md: "row" }}
      boxShadow={"xs"}
      rounded="md"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      {/* Main flex child 1 */}
      <Flex
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        textDecoration={complete ? "line-through" : ""}
        mb={{ sm: "8", md: "0" }}
        textAlign="justify"
      >
        <Container maxW="md" mr={{ sm: "0", md: "4" }}>
          {text}
        </Container>
      </Flex>
      {/* Main flex child 2 */}
      <Flex>
        {/* Flex child 1 */}
        <IconButton
          mx={1}
          className="complete-todo"
          onClick={() => onCompleteTodo(id, complete)}
          aria-label="complete todo"
          icon={<FaCheckSquare />}
        ></IconButton>
        {/* Flex child 2 */}
        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onDeleteTodo(id)}
          aria-label="remove todo"
          icon={<FaTrash />}
        ></IconButton>
        {/* Flex child 3 */}
        <IconButton
          mx={1}
          className="update-todo"
          onClick={onOpen}
          aria-label="update todo"
          icon={<FaEdit />}
        ></IconButton>
        {/* Flex child 4 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={{sm:'sm', md:'lg'}}>
            <ModalHeader fontSize={{ sm: "sm", md: "lg" }}>
              Edit Todo
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={onUpdateTodo}>
              <ModalBody>
                <Textarea
                  fontSize={{ sm: "sm", md: "lg" }}
                  required
                  placeholder={text}
                  type="text"
                  required
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  fontSize={{ sm: "sm", md: "md" }}
                  className="update-todo"
                  type="submit"
                  colorScheme="orange"
                  bg="orange.400"
                  onClick={onClose}
                  rightIcon={<FaPencilAlt />}
                >
                  Save
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Todos;
