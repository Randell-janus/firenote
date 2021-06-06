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
import { FaPencilAlt, FaTrash, FaCheckSquare } from "react-icons/fa";

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
    <Container
      h="100vh"
      maxW="100%"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        align={"center"}
        spacing={{ sm: 10, md: 12 }}
        py={{ sm: 12, md: 14 }}
      >
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
    </Container>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);

  const onCompleteTodo = (id, complete) => {
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  };

  const onDeleteTodo = (id) => {
    todosRef.doc(id).delete();
  };

  return (
    <Flex
      p={6}
      my={6}
      key={id}
      align="center"
      justify="space-between"
      direction={{ sm: "column", md: "row" }}
      boxShadow={"xs"}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Flex
        className={`todo-item ${complete ? "complete" : ""}`}
        tabIndex="0"
        textDecoration={complete ? "line-through" : ""}
        cursor="pointer"
        mb={{ sm: "8", md: "0" }}
        textAlign="justify"
        maxW="md"
      >
        {text}
      </Flex>
      <Flex>
        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onCompleteTodo(id, complete)}
          aria-label="delete todo"
          icon={<FaCheckSquare />}
        ></IconButton>
        <IconButton
          mx={1}
          className="remove-todo"
          onClick={() => onDeleteTodo(id)}
          aria-label="delete todo"
          icon={<FaTrash />}
        ></IconButton>
      </Flex>
    </Flex>
  );
};

export default Todos;
