import { Box, Grid, GridItem } from "@chakra-ui/react";
export default function Calendar() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday']
    return(
    <>
        <Box textAlign={'center'} fontSize={30} fontWeight={'bold'}>
            Weekly Calendar
        </Box>
        <Grid templateColumns='repeat(7, 1fr)' gap={5} margin={5} >
        
         {weekdays.map((day, index) => (
            <GridItem key={index} w='100%' h='10'  textAlign={'center'} justifyContent={'center'} fontSize={20}>
                {day}
            </GridItem>
        ))}
        </Grid>
        
    </>

    )



} 
