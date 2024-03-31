import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        px={10} py={3}
        borderBottom="1px"
        borderColor="gray.200"
        alignItems="center"
      >
        <Heading>Navbar</Heading>
        <Flex gap={5} >
          <Box>
            <Link to="/">Home</Link>
          </Box>
          <Box>
            <Link to="/create">Create</Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
