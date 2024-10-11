import { Box, Button, ChakraProvider } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box>
        Home
        <ChakraProvider>
          <Button colorScheme="blue">Button</Button>
        </ChakraProvider>
      </Box>
    </>
  );
};

export default Home;
