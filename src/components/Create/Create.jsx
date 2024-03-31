import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Input,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  id : "",
  title: "",
  description: "",
  status: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_ID":
      return { ...state, id: payload };
    case "SET_TITLE":
      return { ...state, title: payload };
    case "SET_DESCRIPTION":
      return { ...state, description: payload };
    case "SET_STATUS":
      return { ...state, status: payload };
    default:
      return state;
  }
}


const Create = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {id, title, description, status } = state;

  const generateRandomHexId = () => {
    const characters = "abcdef0123456789";
    const length = 4;
    let randomHexId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomHexId += characters[randomIndex];
    }
    dispatch({ type: "SET_ID", payload: randomHexId });

    return randomHexId;
  };
  const createNewTask = async (e) => {
    e.preventDefault();
    generateRandomHexId()
    try {
      const res = await axios.post(`http://localhost:8080/tasks`, {
        id,
        title,
        description,
        status,
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
        <Box>
          <form onSubmit={createNewTask}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input variant="flushed" value={title} placeholder="Set Title" onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })} />
              <FormLabel>Description</FormLabel>
              <Input value={description} variant="flushed" placeholder="Set Description" onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} />
              <Flex>
                <FormLabel>Status</FormLabel>
                <CheckboxGroup>
                  <Checkbox isChecked={status} onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.checked })}>Completed</Checkbox>
                </CheckboxGroup>
              </Flex>
              <Button colorScheme="blue" type="submit" variant="solid" mt={5}  >Submit</Button>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Create;
