import { Box, Button, Center, Flex} from "@chakra-ui/react";
import Calendar from "../components/calendar";
import CalendarOptions from "../components/calendarOptions";
export default function Home() {
  return (
    <Box mt={3} >
      <Box textAlign={"center"} fontSize={35} fontWeight={"bold"}>
        Weekly Calendar
      </Box>

      <CalendarOptions />
      <Calendar />
    </Box>
  );
}
