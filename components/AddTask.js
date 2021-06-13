import firebase from "firebase";
import { useState, useRef } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Flex,
  Heading,
  Button,
  Input,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
  Accordion,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import Empty from "./Empty";
import Todo from "./Todo";

const AddTask = () => {
  const [todo, setTodo] = useState("");
  const [body, setBody] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const onSubmitTodo = (event) => {
    event.preventDefault();
    setTodo("");
    setBody("");
    todosRef.add({
      text: todo,
      content: body,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  const initialFocusRef = useRef();

  return (
    <>
      <Flex
        direction="column"
        mx="auto"
        maxW={{ base: "sm", md: "2xl" }}
        py={14}
      >
        <Heading mb={3} fontSize={["lg", null, "xl"]}>
          My Tasks
        </Heading>
        <Accordion allowToggle>
          {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
        </Accordion>
        <Popover
          placement="bottom-start"
          offset={[0, -24]}
          initialFocusRef={initialFocusRef}
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Flex
                  alignItems="center"
                  mb={[22, 22, 24]}
                  mt={2}
                  cursor="pointer"
                  _hover={{ textStyle: "reg" }}
                  color="gray.400"
                >
                  <MdAdd />
                  <Text ml={2} fontWeight="500" fontSize={["sm", null, "md"]}>
                    Add section
                  </Text>
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                w={["sm", null, "2xl"]}
                _focus=""
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <PopoverBody pt={2} pb={3}>
                  <form onSubmit={onSubmitTodo}>
                    <Input
                      p={1}
                      variant="Unstyled"
                      maxLength="20"
                      placeholder="Add title"
                      bg={useColorModeValue("gray.50", "gray.800")}
                      fontSize={["sm", null, "md"]}
                      value={todo}
                      required
                      onChange={(e) => setTodo(e.target.value)}
                      ref={initialFocusRef}
                    ></Input>
                    <Input
                      p={1}
                      variant="Unstyled"
                      placeholder="Add details"
                      bg={useColorModeValue("gray.50", "gray.800")}
                      fontSize={["sm", null, "md"]}
                      value={body}
                      required
                      onChange={(e) => setBody(e.target.value)}
                    ></Input>
                    <Button
                      textStyle="white"
                      layerStyle="reg"
                      _hover={{ layerStyle: "hover" }}
                      fontSize={["sm", null, "md"]}
                      _focus=""
                      mr={4}
                      type="submit"
                    >
                      Add task
                    </Button>
                    <Button
                      mt={3}
                      variant="link"
                      fontSize={["sm", null, "md"]}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
        {todos == false && <Empty />}
      </Flex>
    </>
  );
};

export default AddTask;
