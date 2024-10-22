import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Box w="full" bg="red.400" textAlign="center" px="10">
        <Text as="h2" fontSize="2xl" fontWeight="bold" mb="5">
          デジタル名刺アプリ
        </Text>
        <FormLabel>ID</FormLabel>
        <Input mb="5" placeholder="ID"></Input>
        <Button colorScheme="blue" gap="2">
          名刺を探す
          <FaSearch />
        </Button>
      </Box>
    </>
  );
};

export default Home;
