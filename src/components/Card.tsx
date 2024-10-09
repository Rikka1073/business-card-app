import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../utils/supabaseFunction";
import { Text } from "@chakra-ui/react";
import { User } from "../domain/User";

const Card = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState<User[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const userDatas = await getAllUsers();
      if (Array.isArray(userDatas)) {
        setuserData(userDatas);
      } else {
        console.log("Error");
      }
    };
    getUserData();
  }, []);
  return (
    <div>
      id:{id}
      {userData.map((user) => {
        return (
          <div key={user.id}>
            <Text>{user.name}</Text>
            <Text>{user.description}</Text>
            <Text>{user.user_id}</Text>
            <Text>{user.github_id}</Text>
            <Text>{user.qiita_id}</Text>
            <Text>{user.x_id}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
