"use client";
import React, { useRef, useState, ChangeEvent } from "react";
import {
  Button,
  Flex,
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
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

export default function CalendarOptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [eventData, setEventData] = useState({
    Type: "",
    DateTimeStart: moment().format("YYYY-MM-DD HH:00"),
    DateTimeEnd: moment().format("YYYY-MM-DD HH:00"),
    Title: "",
    Description: "",
    UserID: 1,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formattedEventData = {
      ...eventData,
      DateTimeStart: moment(
        eventData.DateTimeStart,
        "YYYY-MM-DD HH:mm",
      ).toDate(),
      DateTimeEnd: moment(eventData.DateTimeEnd, "YYYY-MM-DD HH:mm").toDate(),
    };
    try {
      const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedEventData),
      });

      if (response.ok) {
        // Event created successfully, handle the response if needed
        console.log("Event created successfully");
      } else {
        // Handle errors here
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };
  const handleDateTimeChange = (value: any, fieldName: any) => {
    setEventData({
      ...eventData,
      [fieldName]: moment(value).format("YYYY-MM-DDTHH:mm"),
    });
  };

  return (
    <Flex justifyContent={"center"} mt={4}>
      <Button colorScheme="green" onClick={onOpen}>
        Add Event{" "}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Title</FormLabel>
              <Input
                name="Title"
                ref={initialRef}
                placeholder="Title"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event description</FormLabel>
              <Input
                name="Description"
                ref={finalRef}
                placeholder="Description"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event Type</FormLabel>
              <Input
                name="Type"
                placeholder="Type"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4} color={"gray.600"}>
              <FormLabel color={"white"}>Start Time </FormLabel>
              <DateTime
                timeFormat="HH"
                onChange={(value) =>
                  handleDateTimeChange(value, "DateTimeStart")
                }
              />
            </FormControl>

            <FormControl mt={4} color={"gray.600"}>
              <FormLabel color={"white"}>End Time </FormLabel>
              <DateTime
                timeFormat="HH"
                onChange={(value) =>
                  handleDateTimeChange(value, "DateTimeEnd")
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
