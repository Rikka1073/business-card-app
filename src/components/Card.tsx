import { useEffect, useState } from "react";
import { getAllUsersData } from "../utils/supabaseFunction";
import { User } from "../domain/User";

import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Card = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const userDatas = await getAllUsersData();
      console.log(userDatas);
      if (Array.isArray(userDatas)) {
        const matchUserData = userDatas.find((number) => number.user_id === id);
        if (matchUserData) {
          console.log("データが表示されるます");
          setuserData(userDatas);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } else {
        console.log("Error");
      }
    };
    getUserData();
  }, [id]);

  return (
    <div>
      id:{id}
      <Box>
        {loading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          userData.map((user, index) => {
            return (
              <div key={index}>
                <Text>{user.name}</Text>
                <Text>{user.description}</Text>
                <Text>{user.github_id}</Text>
                <Text>{user.qiita_id}</Text>
                <Text>{user.x_id}</Text>
                <Text>{user.skill}</Text>
              </div>
            );
          })
        )}
      </Box>
    </div>
  );
};

export default Card;
