"use client";
import React, { useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

export default function KanbanOptions({ setFilter }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [filterCriteria, setFilterCriteria] = useState("");

  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value;
    console.log(newFilter);
    setFilterCriteria(newFilter);
    setFilter(newFilter);
  };

  return (
    <Flex justifyContent={"center"} gap={100}>
      <Button colorScheme="green" onClick={onOpen}>
        Add Kanban Board
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your board</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name Kanban Board</FormLabel>
              <Input ref={initialRef} placeholder="Name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Input
        placeholder="Search board"
        w={250}
        value={filterCriteria}
        onChange={handleFilterChange}
      />
    </Flex>
  );
}
