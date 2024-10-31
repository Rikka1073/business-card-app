import { Box, Button, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onchangeButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    console.log("名刺を探すボタンが押されました");
    console.log(e.target.value);
  };

  const onclickSearch = () => {
    navigate(`/cards/${id}`);
  };

  const onclickNewButton = () => {
    navigate(`/cards/register`);
  };

  const onsubmit = (data: any) => console.log(data);

  return (
    <>
      <FormControl onSubmit={handleSubmit(onsubmit)}>
        <Box w="full" bg="red.400" textAlign="center" px="10">
          <Text data-testid="homeTitleId" as="h2" fontSize="2xl" fontWeight="bold" mb="5">
            デジタル名刺アプリ
          </Text>
          <FormLabel>ID</FormLabel>
          <Input
            {...register("search", { required: true, onChange: onchangeButton })}
            mb="5"
            placeholder="ID"
            value={id}
            data-testid="searchId"
          />
          {errors.search && (
            <Text data-testid="errorMessageId" color="red.500">
              IDは必須です
            </Text>
          )}
          <Button
            data-testid="searchButton"
            colorScheme="blue"
            w="40"
            display="flex"
            gap="2"
            alignItems="center"
            m="auto"
            onClick={onclickSearch}
            disabled={!isValid}
          >
            名刺を探す
            <FaSearch />
          </Button>
          <Button data-testid="newButton" onClick={onclickNewButton}>
            新規登録はこちら
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

export default Home;
