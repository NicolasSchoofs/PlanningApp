'use client'
import { Box, Text, Center, Picture} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0/client';
export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    user && (
      <Center mt={4}>
        <Text fontSize='3xl'>Welcome bij mijn planning app {user.name}</Text>
      </Center>
    )
  );
}
