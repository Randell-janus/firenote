import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Container,
  Box,
  Text,
  Button,
  useColorModeValue,
  Textarea,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { FaCheckSquare, FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import EditHeading from "./EditHeading";
import { completeStyle } from "./theme";

const Todo = ({ id, complete, text, content }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [bodies] = useCollectionData(todosRef, { idField: "id" });

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
    // e.preventDefault();
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
    // e.preventDefault();
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
      {/* <Flex align="center" justify="space-between">
        <Flex>
          <IconButton
            onClick={() => onCompleteTodo(id, complete)}
            aria-label="complete todo"
            icon={<FaCheckSquare />}
          />
          <IconButton
            onClick={onOpen}
            aria-label="update todo"
            icon={<FaEdit />}
          />
          <DeleteModal modalBody="Are you sure you want to delete this task?">
            <Button onClick={() => onDeleteTodo(id)}>Delete</Button>
          </DeleteModal>
        </Flex>
      </Flex> */}

      <AccordionItem>
        <AccordionButton _focus="">
          <Text
            flex="1"
            textAlign="left"
            color="gray.800"
            fontWeight="500"
            fontSize={["sm", null, "md"]}
          >
            <Editable defaultValue={text} onSubmit={onUpdateTodo}>
              <EditablePreview />
              <EditableInput
                onChange={(e) => setEditedTodo(e.target.value)}
                _focus=""
              />
            </Editable>
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          fontSize={["sm", null, "md"]}
          // maxW={["xs", null, "md"]}
          display="flex"
          justifyContent="space-between"
        >
          <Editable defaultValue={content} onSubmit={onUpdateBody}>
            <EditablePreview />
            <EditableInput
              onChange={(e) => setEditedBody(e.target.value)}
              _focus=""
            />
          </Editable>
          <Menu>
            {/* <Box mt={1}>
              <BsThreeDots cursor="pointer" />
            </Box> */}
            <MenuButton aria-label="Options" mr={0.5}>
              <BsThreeDots cursor="pointer" />
            </MenuButton>
            <MenuList maxW="sm">
              <MenuItem icon={<FaEdit />}>Edit</MenuItem>
              <MenuItem icon={<FaTrash />} onClick={() => onDeleteTodo(id)}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </AccordionPanel>
      </AccordionItem>

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
    </>
  );
};

export default Todo;
