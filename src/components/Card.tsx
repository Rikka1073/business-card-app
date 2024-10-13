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
      if (Array.isArray(userDatas)) {
        setuserData(userDatas);
        setLoading(false);
      } else {
        console.log("Error");
      }
    };
    getUserData();
  }, []);

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
                <Text>{user.skills}</Text>
              </div>
            );
          })
        )}
      </Box>
    </div>
  );
};

export default Card;
