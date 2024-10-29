import { Box, Button, Center, FormControl, Input, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../domain/User";
import { createSkill, createUser, createUserSkill } from "../utils/supabaseFunction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [skill, setSkill] = useState("");
  const [githubId, setGithubId] = useState("");
  const [qiitaId, setQiitaId] = useState("");
  const [xId, setXId] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const onsubmit = (data: any) => console.log(data);

  const onclickEntry = () => {
    console.log("登録ボタンが押されました");
    const newUserData: User = {
      name: name,
      description: introduce,
      github_id: githubId,
      qiita_id: qiitaId,
      x_id: xId,
      user_id: userId,
      skill: skill,
    };
    const newUserDatas = [...userData, newUserData];
    setUserData(newUserDatas);
    createUser(userId, name, introduce, githubId, qiitaId, xId);
    createUserSkill(userId, skill);
    createSkill(skill);
    console.log(newUserDatas);
    setUserId("");
    setName("");
    setIntroduce("");
    setSkill("");
    setGithubId("");
    setQiitaId("");
    setXId("");
    navigate("/");
  };

  const onchangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserId(e.target.value);
  };

  const onchangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onchangeIntroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIntroduce(e.target.value);
  };

  const onchangeSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSkill(e.target.value);
  };

  const onchangeGithubId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setGithubId(e.target.value);
  };

  const onchangeQiitaId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQiitaId(e.target.value);
  };

  const onchangeXId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setXId(e.target.value);
  };

  return (
    <Box position="relative" overflow-y="scroll">
      <Center>
        <Box bg="red.400" p="4" w="300px">
          <Center>
            <Text data-testid="registerTitleId" fontSize="lg" fontWeight="bold" mb="5">
              名刺新規登録
            </Text>
          </Center>
          <FormControl onSubmit={handleSubmit(onsubmit)} h="500px" overflow="scroll">
            <Box mb="5">
              <Text pl="2" mb="1">
                ID
              </Text>
              <Input
                {...register("id", { required: true, onChange: onchangeId })}
                placeholder="ID"
                mb="2"
                value={userId}
                data-testid="inputId"
              />
              {errors.id && (
                <Text data-testid="errorMessageId" color="red.500">
                  IDは必須です
                </Text>
              )}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                名前
              </Text>
              <Input
                {...register("name", { required: true, onChange: onchangeName })}
                placeholder="名前"
                value={name}
                mb="2"
                data-testid="inputName"
              />
              {errors.name && (
                <Text data-testid="errorMessageName" color="red.500">
                  名前は必須です
                </Text>
              )}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                自己紹介
              </Text>
              <Input
                {...register("introduce", { required: true, onChange: onchangeIntroduce })}
                placeholder="自己紹介"
                h="150px"
                mb="2"
                value={introduce}
                data-testid="inputIntroduce"
              />
              {errors.introduce && (
                <Text data-testid="errorMessageIntroduce" color="red.500">
                  自己紹介は必須です
                </Text>
              )}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                好きな技術
              </Text>
              <Select
                placeholder="Select option"
                {...register("skill", {
                  required: "Skill is required",
                  onChange: onchangeSkill,
                })}
                value={skill}
              >
                <option value="React">React</option>
                <option value="Typescript">Typescript</option>
                <option value="Github">Github</option>
              </Select>
              {errors.skill && <Text color="red.500">スキルは必須です</Text>}
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                Github Id
              </Text>
              <Input onChange={onchangeGithubId} placeholder="Github Id" value={githubId} mb="2" />
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                Qiita Id
              </Text>
              <Input onChange={onchangeQiitaId} placeholder="Qiita Id" value={qiitaId} mb="5" />
            </Box>
            <Box mb="5">
              <Text pl="2" mb="1">
                X Id
              </Text>
              <Input onChange={onchangeXId} placeholder="X Id" value={xId} />
            </Box>
            <Button
              type="submit"
              disabled={!isValid}
              colorScheme="teal"
              mt="5"
              w="full"
              onClick={onclickEntry}
            >
              登録
            </Button>
          </FormControl>
        </Box>
      </Center>
    </Box>
  );
};

export default Register;
