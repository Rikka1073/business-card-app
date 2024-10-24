import { Box, Button, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [id, setId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onchangeButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log("名刺を探すボタンが押されました");
    console.log(e.target.value);
  };

  const onsubmit = (data) => console.log(data);

  return (
    <>
      <FormControl onSubmit={handleSubmit(onsubmit)}>
        <Box w="full" bg="red.400" textAlign="center" px="10">
          <Text as="h2" fontSize="2xl" fontWeight="bold" mb="5">
            デジタル名刺アプリ
          </Text>
          <FormLabel>ID</FormLabel>
          <Input
            {...register("search", { required: true, onChange: onchangeButton })}
            mb="5"
            placeholder="ID"
            value={id}
          />
          {errors.search && <Text color="red.500">IDは必須です</Text>}
          <Link href={`/cards/${id}`} isExternal>
            <Button colorScheme="blue" w="40" display="flex" gap="2" alignItems="center" m="auto">
              名刺を探す
              <FaSearch />
            </Button>
          </Link>
        </Box>
      </FormControl>
    </>
  );
};

export default Home;
