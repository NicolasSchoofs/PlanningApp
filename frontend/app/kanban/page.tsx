"use client";
import React, {useState} from "react";
import { Box } from "@chakra-ui/react";
import KanbanOptions from "../components/kanbanOptions";
import KanbanBoards from "../components/kanbanBoars";
export default function KanbanHome() {
  const [filter, setFilter] = useState("");
  return (
  <Box mt={4}>
    <KanbanOptions setFilter={setFilter} />
    <KanbanBoards filter={filter}/>
  </Box>
  );
}
