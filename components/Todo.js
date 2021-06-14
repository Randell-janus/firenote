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
  Textarea,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDots, BsCircle, BsCheckCircle } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";

const Todo = ({ id, complete, text, content }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [editedTodo, setEditedTodo] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const [editTitleModalIsOpen, setEditTitleModalIsOpen] = useState(false);
  const onCloseTitleBodyModal = () => setEditTitleModalIsOpen(false);

  const [editBodyModalIsOpen, setEditBodyModalIsOpen] = useState(false);
  const onCloseEditBodyModal = () => setEditBodyModalIsOpen(false);

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

              <Container w={["2xs", null, "xl"]} py={2}>
                {content}
              </Container>

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
                  <MenuItem
                    icon={<FaEdit />}
                    onClick={() => setEditTitleModalIsOpen(true)}
                  >
                    Edit title
                  </MenuItem>

                  <MenuItem
                    icon={<CgDetailsMore />}
                    onClick={() => setEditBodyModalIsOpen(true)}
                  >
                    Edit details
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

      {/* EDIT TITLE MODAL */}
      <AlertDialog
        isOpen={editTitleModalIsOpen}
        onClose={onCloseTitleBodyModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW={["xs", "xs", "sm"]}>
            <AlertDialogHeader fontSize={["md", null, "lg"]} fontWeight="bold">
              Edit title
            </AlertDialogHeader>
            <form onSubmit={onUpdateTitle}>
              <AlertDialogBody>
                <Input
                  _focus=""
                  variant="Unstyled"
                  placeholder={text}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontSize={["sm", null, "md"]}
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                ></Input>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  variant="ghost"
                  _focus=""
                  onClick={onCloseTitleBodyModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  layerStyle="reg"
                  _focus=""
                  _hover={{ layerStyle: "hover" }}
                  onClick={onCloseTitleBodyModal}
                  ml={3}
                  color="white"
                >
                  Save
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* EDIT DETAILS MODAL */}
      <AlertDialog isOpen={editBodyModalIsOpen} onClose={onCloseEditBodyModal}>
        <AlertDialogOverlay>
          <AlertDialogContent maxW={["xs", "xs", "sm"]}>
            <AlertDialogHeader fontSize={["md", null, "lg"]} fontWeight="bold">
              Edit details
            </AlertDialogHeader>
            <form onSubmit={onUpdateBody}>
              <AlertDialogBody>
                <Textarea
                  _focus=""
                  variant="Unstyled"
                  placeholder={content}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontSize={["sm", null, "md"]}
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                ></Textarea>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  variant="ghost"
                  _focus=""
                  onClick={onCloseEditBodyModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  layerStyle="reg"
                  _focus=""
                  _hover={{ layerStyle: "hover" }}
                  onClick={onCloseEditBodyModal}
                  ml={3}
                  color="white"
                >
                  Save
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Todo;
