import { Button, ChakraProvider } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      Home
      <ChakraProvider>
        <Button colorScheme="blue">Button</Button>
      </ChakraProvider>
    </div>
  );
};

export default Home;
