import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskList from "./TaskList";
import { Heading } from "@chakra-ui/react";
// import { tasks } from "../../../db.json";
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DATA":
      return { ...state, tasks: payload };
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_LOADING":
      return { ...state, loading: payload };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { tasks, loading, error } = state;
  const fetchData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await axios.get(`http://localhost:8080/tasks`);
      const data = await res.data;
      dispatch({ type: "SET_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Heading>Loading...</Heading>;

  if (error) return <Heading>{error}</Heading>;

  return (
    <>
      <TaskList tasks={tasks} />
    </>
  );
};

export default Home;
