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
          <div>
            <Text>{user.name}</Text>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
