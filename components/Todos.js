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
  Box,
  Flex,
  IconButton,
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
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
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
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
      </Box>
    </Stack>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);

  const [editedTodo, setEditedTodo] = useState("");

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };

  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };

  function onUpdateTodo(event) {
    event.preventDefault();
    setEditedTodo("");
    todosRef
      .doc(id)
      .update({
        text: editedTodo,
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Flex
      p={{ sm: "6", md: "5" }}
      mt={4}
      key={id}
      align="center"
      justify="space-between"
      direction={{ sm: "column", md: "row" }}
      boxShadow={"xs"}
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
        <Container maxW="md">{text}</Container>
      </Flex>
      {/* Main flex child 2 */}
      <Flex>
        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onCompleteTodo(id, complete)}
          aria-label="complete todo"
          icon={<FaCheckSquare />}
        ></IconButton>
        <form onSubmit={onUpdateTodo}>
          <input
            type="text"
            required
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
          />
          <IconButton
            mx={1}
            className="remove-todo"
            type="submit"
            // onClick={() => onUpdateTodo(id)}
            aria-label="edit todo"
            icon={<FaEdit />}
          ></IconButton>
        </form>

        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onDeleteTodo(id)}
          aria-label="delete todo"
          icon={<FaTrash />}
        ></IconButton>
        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onDeleteTodo(id)}
          aria-label="delete todo"
          icon={<FaEdit />}
        ></IconButton>
      </Flex>
    </Flex>
  );
};

export default Todos;
