"use client";
import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  VStack,
  Text,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Event } from "./interfaces";

import axios from "axios";


async function fetchData(): Promise<Event[]> {
  try {
    const response = await axios.get("http://localhost:8080/events");

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = response.data.events as Event[];
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
}
function getCurrentWeekDates() {
  const today = new Date();
  const startOfWeek = new Date(today);

  // Calculate the number of days to subtract to get to Monday
  const daysToSubtract = (today.getDay() + 6) % 7;
  startOfWeek.setDate(today.getDate() - daysToSubtract);

  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekdays.push(currentDate);
  }

  return weekdays;
}

const weekdays = getCurrentWeekDates();

export default function Calendar() {
  const bgWeekDay = useColorModeValue("gray.200", "gray.900");
  const itemCount = 4;
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
  async function fetchAndSetEvents() {
    try {
      const data = await fetchData();
      setEvents(data);
      console.log(data);
    } catch (error) {
      console.error("Error setting events:", error);
    }
  }

  fetchAndSetEvents();
}, []);

   if (events.length === 0) {
    // Data is not loaded yet
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  
if (events.length !== 0) {
  return (
    <>
      <Grid templateColumns="repeat(15, 1fr)" gap={5} mt={5} mr={10}>
        <GridItem colSpan={1}></GridItem>
        {weekdays.map((date, index) => (
          <GridItem colSpan={2} key={index} mb={4}>
            <Center display={"flex"} gap={2}>
              <Text fontWeight={"bold"} fontSize={20}>
                {date.toLocaleDateString("en-GB", { weekday: "short" })}
              </Text>
              <Text fontSize={12} color={"gray.600"}>
                {date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </Text>
            </Center>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns="repeat(15, 1fr)" gap={5} h={500} mr={10}>
        <GridItem colSpan={1}>
          <VStack justify="flex-start" spacing={6}>
            {[...Array(15)].map((_, index) => (
              <Box key={index} h={54}>
                {`${8 + index}:00`}
              </Box>
            ))}
          </VStack>
        </GridItem>
        {weekdays.map((date, index) => (
          <GridItem colSpan={2} key={index}>
            <Flex flexDirection={"column"}>
              {[...Array(14)].map((_, i) => (
                <Box bg={bgWeekDay} key={i} h={79}>
                  {events.map((event, z) => {
                    const startDate = new Date(event.DateTimeStart);
                    const endDate = new Date(event.DateTimeEnd);
                    if (
                      startDate.getDay() === date.getDay() &&
                      startDate.getHours() <= 8 + i &&
                      endDate.getHours() > 8 + i
                    ) {
                      return (
                        <Flex
                          key={z}
                          h={"100%"}
                          bg={"gray.700"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                        >
                          <Text
                            fontSize={10}
                            color={"gray.400"}
                            height={"20%"}
                            pl={2}
                          >
                            {startDate.getHours()}:00
                          </Text>
                          <Center
                            height={"60%"}
                            display="flex"
                            flexDirection="column"
                          >
                            <Text fontWeight={"bold"} fontSize={15}>
                              {event.Title}
                            </Text>
                            <Text color={"gray.400"} fontSize={10}>
                              {event.Description}
                            </Text>
                          </Center>
                          <Text
                            fontSize={10}
                            color={"gray.400"}
                            height={"20%"}
                            textAlign={"right"}
                            pr={2}
                          >
                            {endDate.getHours()}:00
                          </Text>
                        </Flex>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Box>
              ))}
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
}
