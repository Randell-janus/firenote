import firebase from "firebase";
import { useState } from "react";
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
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPencilAlt, FaCheckSquare, FaEdit } from "react-icons/fa";
import EditHeading from "./EditHeading";
import DeleteModal from "./DeleteModal";
import { completeStyle } from "./theme";

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
      spacing={{ base: 10, md: 12 }}
      py={{ base: 12, md: 14 }}
    >
      {/* Main stack child 1 */}
      <Stack direction="column" align={"center"} spacing={{ base: 4, md: 6 }}>
        <Heading
          fontWeight={700}
          fontSize={{ base: "4xl", md: "5xl" }}
          lineHeight={"30%"}
          textDecoration="underline"
          color={useColorModeValue("gray.800", "gray.200")}
        >
          fire
          <Text as={"span"} textStyle="reg">
            note
          </Text>
        </Heading>
      </Stack>
      {/* Main stack child 2 */}
      <Box
        w={{ base: "sm", md: "2xl" }}
        bg={useColorModeValue("gray.50", "gray.800")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        {/* Box child 1 */}
        <form onSubmit={onSubmitTodo}>
          <Stack spacing={4} direction={{ base: "column", md: "row" }} mb={8}>
            <Input
              w={{ base: "auto", md: "lg" }}
              variant="flushed"
              required
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              fontSize={["sm", "sm", "md"]}
              placeholder={"Got an idea?"}
              type={"text"}
              color={useColorModeValue("gray.800", "gray.200")}
            />
            <Button
              type="submit"
              px={14}
              layerStyle="reg"
              color="white"
              _hover={{ layerStyle: "hover" }}
              _focus=""
              fontSize={["sm", "sm", "md"]}
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
      p={{ base: "6", md: "5" }}
      mt={4}
      key={id}
      align="center"
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      boxShadow={"md"}
      rounded="md"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      {/* Main flex child 1 */}
      <Flex
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        textDecoration={complete ? "line-through" : ""}
        textDecorationThickness={3}
        textDecorationColor={completeStyle}
        mb={{ base: "8", md: "0" }}
        textAlign="justify"
      >
        <Container
          color={useColorModeValue("black", "gray.50")}
          fontWeight="500"
          fontSize={["sm", "sm", "md"]}
          maxW="md"
          mr={{ base: "0", md: "4" }}
        >
          {text}
        </Container>
      </Flex>
      {/* Main flex child 2 */}
      <Flex>
        {/* Flex child 1 */}
        <IconButton
          size="sm"
          _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          _focus=""
          onClick={() => onCompleteTodo(id, complete)}
          aria-label="complete todo"
          icon={<FaCheckSquare />}
        />
        {/* Flex child 2 */}
        <IconButton
          mx={{ base: "2", md: "3" }}
          size="sm"
          _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          _focus=""
          onClick={onOpen}
          aria-label="update todo"
          icon={<FaEdit />}
        />

        {/* Flex child 3 */}
        <DeleteModal modalBody="Are you sure you want to delete this task?">
          <Button
            fontSize={["sm", "sm", "md"]}
            type="submit"
            layerStyle="reg"
            color="white"
            _hover={{ layerStyle: "hover" }}
            _focus=""
            onClick={() => onDeleteTodo(id)}
          >
            Delete
          </Button>
        </DeleteModal>
      </Flex>
      {/* EDIT MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "xs", md: "sm" }}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <EditHeading />
          <form onSubmit={onUpdateTodo}>
            <ModalBody>
              <Textarea
                fontSize={["sm", "sm", "md"]}
                placeholder={text}
                type="text"
                required
                value={editedTodo}
                onChange={(e) => setEditedTodo(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                fontSize={["sm", "sm", "md"]}
                layerStyle="reg"
                color="white"
                _hover={{ layerStyle: "hover" }}
                _focus=""
                type="submit"
                onClick={onClose}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Todos;
