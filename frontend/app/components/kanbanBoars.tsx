"use client";
import react from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import { KanbanBoard } from "./interfaces";

export default function KanbanBoards({ filter }: any) {

  let board1: KanbanBoard = {
    Id: 1,
    Title: "Planning app",
    Description: "Kanban board for my planning app",
    Cards: [],
    UserID: 1,
  };
  let listOfBoards: KanbanBoard[] = [board1, board1, board1, board1, board1, board1];

  const filteredBoards = listOfBoards.filter((board) =>
    board.Title.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Flex direction="column" mt={5} ml={5} mr={5}>
      {chunkArray(filteredBoards, 4).map((row, rowIndex: number) => (
        <Flex key={rowIndex} gap={10} mt={5}>
          {row.map((board: KanbanBoard) => (
            <Box
              bg={"gray.700"}
              key={board.Id}
              w="100%"
              p={4}
              color="white"
              _hover={{ background: "gray.600", cursor: "pointer", transition: "0.5s ease" }}
            >
              <Text fontWeight={"bold"} fontSize={30}>
                {board.Title}
              </Text>
              <Text pt={10}>{board.Description}</Text>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  );
}
function chunkArray(array: KanbanBoard[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
