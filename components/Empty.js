import {
  Flex,
  Text,
  Image,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
} from "@chakra-ui/react";
import firebase from "firebase";
import { useState, useRef } from "react";
import { auth, firestore } from "../firebase/firebase";

const Empty = () => {
  const [todo, setTodo] = useState("");
  const [body, setBody] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);

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

        <Popover
          placement="top"
          offset={[0, 80]}
          initialFocusRef={initialFocusRef}
        >
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  mt={4}
                  textStyle="white"
                  layerStyle="reg"
                  _hover={{ layerStyle: "hover" }}
                  _focus=""
                >
                  Add a task
                </Button>
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
      </Flex>
    </>
  );
};

export default Empty;
