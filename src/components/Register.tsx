import { Box, Button, Center, Input, Select, Text } from "@chakra-ui/react";

const Register = () => {
  return (
    <Box position="relative" overflow-y="auto">
      <Center>
        <Box bg="red.400" p="4" w="300px">
          <Center>
            <Text fontSize="lg" fontWeight="bold">
              名刺新規登録
            </Text>
          </Center>
          <Text pl="2" mb="1">
            ID
          </Text>
          <Input placeholder="ID" mb="5" />
          <Text pl="2" mb="1">
            名前
          </Text>
          <Input placeholder="名前" mb="5" />
          <Text pl="2" mb="1">
            自己紹介
          </Text>
          <Input placeholder="自己紹介" mb="5" h="150px" />
          <Text pl="2" mb="1">
            好きな技術
          </Text>
          <Select placeholder="Select option" mb="5">
            <option value="option1">React</option>
            <option value="option2">Typescript</option>
            <option value="option3">Github</option>
          </Select>
          <Text pl="2" mb="1">
            Github Id
          </Text>
          <Input placeholder="Github Id" mb="5" />
          <Text pl="2" mb="1">
            Qiita Id
          </Text>
          <Input placeholder="Qiita Id" mb="5" />
          <Text pl="2" mb="1">
            {" "}
            "Twitter Id
          </Text>
          <Input placeholder="Twitter Id" />
          <Button colorScheme="teal" mt="5" w="full">
            登録
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Register;
