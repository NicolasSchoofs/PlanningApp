"use client";
import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  VStack,
  Text,
  Center
} from "@chakra-ui/react";
export default function Calendar() {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const bgWeekDay = useColorModeValue("gray.200", "gray.900");

  return (
    <>
      <Box textAlign={"center"} fontSize={35} fontWeight={"bold"}>
        Weekly Calendar
      </Box>
      <Grid templateColumns="repeat(15, 1fr)" gap={5} mt={10} mr={10}>
        <GridItem colSpan={1}></GridItem>
        {weekdays.map((day, index) => (
          <GridItem colSpan={2} key={index} mb={4}>
            <Center
              display={"flex"}
              gap={2}
            >
              <Text fontWeight={"bold"} fontSize={20} >{day}</Text>
              <Text fontSize={12} color={"gray.600"}>08/02</Text>
            </Center>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns="repeat(15, 1fr)" gap={5} h={500} mr={10}>
        <GridItem colSpan={1}>
          <VStack justify="flex-start" spacing={6} >
            {[...Array(15)].map((_, index) => (
              <Box key={index} h={33}>
                {`${8 + index}:00`}
              </Box>
            ))}
          </VStack>
        </GridItem>
        {weekdays.map((day, index) => (
          <GridItem colSpan={2} key={index} h="10">
            <Box bg={bgWeekDay} h={820}>
              {" "}
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
