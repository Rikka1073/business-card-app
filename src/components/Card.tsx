import { useEffect, useState } from "react";
import { getAllUsersData } from "../utils/supabaseFunction";
import { User } from "../domain/User";

import { Box, Button, Link, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import * as DOMPurify from "isomorphic-dompurify";

import parse from "html-react-parser";

const Card = () => {
  const { id } = useParams();
  const [userData, setuserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const ParserSanitized = ({ html }: { html: string }) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return parse(sanitizedHtml);
  };

  const onclickBackButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const getUserData = async () => {
      const userDatas = await getAllUsersData();
      if (Array.isArray(userDatas)) {
        const matchUserData = userDatas.find((number) => number.user_id === id);
        if (matchUserData) {
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
    <Box bg="blue.100" h="100vh" display="flex" alignItems="center" justifyContent="center">
      {/* {id} */}
      <Box boxShadow="xs" p="6" rounded="md" bg="white" w="80%">
        {loading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          userData.map((user, index) => {
            return (
              <Box key={index}>
                <Text data-testid="userName" mb={5}>
                  ID:{user.user_id}
                </Text>
                <Text mb={5}>名前:{user.name}</Text>
                <Box data-testid="userDescription" mb={5}>
                  自己紹介:
                  <ParserSanitized html={user.description} />
                </Box>
                <Text data-testid="userSkill" mb={5}>
                  スキル:{user.skill}
                </Text>
                <Box display="flex" justifyContent="space-between" mb={5}>
                  <Text data-testid="userGithub">
                    <Link href={`https://github.com/${user.github_id}`} isExternal>
                      <FaGithub size={40} />
                    </Link>
                  </Text>
                  <Text data-testid="userQiita">
                    <Link href={`https://qiita.com/${user.qiita_id}`} isExternal>
                      <SiQiita size={40} />
                    </Link>
                  </Text>
                  <Text data-testid="userX">
                    <Link href={`https://x.com/${user.x_id}`} isExternal>
                      <FaXTwitter size={40} />
                    </Link>
                  </Text>
                </Box>
                <Button onClick={onclickBackButton} data-testid="backButton" w="full">
                  戻る
                </Button>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Card;
