'use client'
import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import theme from './theme'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from 'react-query';

export function Providers({ 
        children 
        }: { 
children: React.ReactNode 
}) {
  const queryClient = new QueryClient();
    return (
            <UserProvider>
            <CacheProvider>
            <ChakraProvider theme={theme} >
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
            </ChakraProvider>
            </CacheProvider>
            </UserProvider>
           )
}
