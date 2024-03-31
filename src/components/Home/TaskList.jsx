import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TaskList = ({tasks}) => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>S.no</Th>
              <Th>Title</Th>
                          <Th>Status</Th>
                          <Th>Edit</Th>
            </Tr>
          </Thead>
                  <Tbody>
                     {tasks.map((task, index) => (
                         <Tr key={task.id}>
                             <Td>{index + 1}</Td>
                             <Td>{task.title}</Td>
                             <Td>{(task.status) ? "Completed" : "Not Completed"}</Td>

                             <Td><Link to={`/edit/${task.id}`}>Edit</Link></Td>
                         </Tr>
                     ))} 
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
