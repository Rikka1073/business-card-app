import { Box, Button, Center, FormControl, Input, Select, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onsubmit = (data) => console.log(data);
  return (
    <Box position="relative" overflow-y="auto">
      <Center>
        <Box bg="red.400" p="4" w="300px">
          <Center>
            <Text fontSize="lg" fontWeight="bold">
              名刺新規登録
            </Text>
          </Center>
          <FormControl onSubmit={handleSubmit(onsubmit)}>
            <Box mb="5">
              <Text pl="2" mb="1">
                ID
              </Text>
              <Input {...register("id", { required: true })} placeholder="ID" mb="2" />
              {errors.id && <Text color="red.500">IDは必須です</Text>}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                名前
              </Text>
              <Input {...register("name", { required: true })} placeholder="名前" mb="2" />
              {errors.name && <Text color="red.500">名前は必須です</Text>}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                自己紹介
              </Text>
              <Input
                {...register("introduce", { required: true })}
                placeholder="自己紹介"
                h="150px"
                mb="2"
              />
              {errors.introduce && <Text color="red.500">自己紹介は必須です</Text>}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                好きな技術
              </Text>
              <Select placeholder="Select option" {...register("skill", { required: true })}>
                <option value="option1">React</option>
                <option value="option2">Typescript</option>
                <option value="option3">Github</option>
              </Select>
              {errors.skill && <Text color="red.500">スキルは必須です</Text>}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                Github Id
              </Text>
              <Input placeholder="Github Id" mb="2" />
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                Qiita Id
              </Text>
              <Input placeholder="Qiita Id" mb="5" />
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                X Id
              </Text>
              <Input placeholder="X Id" />
            </Box>
            <Button colorScheme="teal" mt="5" w="full">
              登録
            </Button>
          </FormControl>
        </Box>
      </Center>
    </Box>
  );
};

export default Register;
