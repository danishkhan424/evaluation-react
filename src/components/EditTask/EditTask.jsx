import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Checkbox,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

// fetching edit task reducer
const initialState = {
  title: "",
  description: "",
  status: false,
  singleTask: {},
  loading: false,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_TITLE":
      return { ...state, title: payload };
    case "SET_DESCRIPTION":
      return { ...state, description: payload };
    case "SET_STATUS":
      return { ...state, status: payload };
    case "SET_DATA":
      return { ...state, singleTask: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    default:
      return state;
  }
};
// fetching edit task reducer

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // EDIT TASK MODEL
  const { isOpen, onOpen, onClose } = useDisclosure();
  
 const setNewTask = async () => {
   dispatch({ type: "SET_LOADING", payload: true });
   try {
     const res = await axios.patch(`http://localhost:8080/tasks/${id}`, {
       title: state.title,
       description: state.description,
       status: state.status,
     });
     const data = await res.data;
     dispatch({ type: "SET_DATA", payload: data });
   } catch (error) {
     dispatch({ type: "SET_ERROR", payload: error.message });
   } finally {
     dispatch({ type: "SET_LOADING", payload: false });
   }
 }

  // EDIT TASK MODEL

  // single task logic
  const [state, dispatch] = useReducer(reducer, initialState);
  const { singleTask, loading, error } = state;

  const fetchEditTask = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`http://localhost:8080/tasks/${id}`);
      const data = await res.data;
      dispatch({ type: "SET_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  // single task logic

  useEffect(() => {
    fetchEditTask();
  }, []);

  // delete task logic
  const deleteTask = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.delete(`http://localhost:8080/tasks/${id}`);
      const data = await res.data;
      dispatch({ type: "SET_DATA", payload: data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }

    // delete task logic
    // loading and error handeling
  };
  if (loading) return <Heading>Loading...</Heading>;

  if (error) return <Heading>{error}</Heading>;
  // loading and error handeling

  return (
    <>
      {/* <Heading>Edit Task</Heading> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Title: <Input variant="outline" value={state.title} placeholder="Set Title" onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })} />{" "}
            </Text>
            <Text>
              Discription:{" "}
              <Input variant="outline" value={state.description} placeholder="Set Description" onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} />
            </Text>
            <Text>
              Status: <Checkbox isChecked={state.status} mx={3} onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.checked })} >Complete</Checkbox>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button onClick={setNewTask} variant="ghost" colorScheme="blue">
              Set Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Heading>Edit Task</Heading> */}

      <Flex gap={5} justifyContent="center" mt={10}>
        <Box>
          <Heading>TITLE: {singleTask.title}</Heading>
          <Text>Discription: {singleTask.description}</Text>
          <Text>
            Status: {singleTask.status ? "Completed" : "Not Completed"}
          </Text>
          <Flex gap={5} mt={5} justifyContent="space-between">
            <Button colorScheme="blue" onClick={onOpen}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => deleteTask()}>
              Delete
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default EditTask;
