import { useEffect, useState } from "react";
import { getAllUsersData } from "../utils/supabaseFunction";
import { User } from "../domain/User";

import { Box, Button, Link, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const Card = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const ParserSanitized = ({ html }) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return parse(sanitizedHtml);
  };

  useEffect(() => {
    const getUserData = async () => {
      const userDatas = await getAllUsersData();
      console.log(userDatas);
      if (Array.isArray(userDatas)) {
        const matchUserData = userDatas.find((number) => number.user_id === id);
        console.log(matchUserData);
        if (matchUserData) {
          console.log("データが表示されるます");
          setuserData([matchUserData]);
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
    <Box bg="red.300" h="100vh" display="flex" alignItems="center" justifyContent="center">
      {id}
      <Box boxShadow="xs" p="6" rounded="md" bg="white" w="80%">
        {loading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          userData.map((user, index) => {
            return (
              <Box key={index}>
                <Text>ID:{user.user_id}</Text>
                <Text>名前:{user.name}</Text>
                <Box>
                  自己紹介:
                  <ParserSanitized html={user.description} />
                </Box>
                <Text>スキル:{user.skill}</Text>
                <Text>
                  Github:
                  <Link href={`https://github.com/${user.github_id}`} isExternal>
                    {user.github_id}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
                <Text>
                  Quiita:
                  <Link href={`https://qiita.com/${user.qiita_id}`} isExternal>
                    {user.qiita_id}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
                <Text>
                  X:
                  <Link href={`https://x.com/${user.x_id}`} isExternal>
                    {user.x_id}
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
                <Link href={`/`} isExternal>
                  <Button>戻る</Button>
                </Link>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Card;
