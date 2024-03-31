import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Create from "../components/Create/Create";
import EditTask from "../components/EditTask/EditTask";
import SingleTask from "../components/SingleTask/SingleTask";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/single/:id" element={<SingleTask />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
