import { User } from "../domain/User";
import { supabase } from "./supabase";

export const getAllUsersData = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `*, user_skill!user_skill_user_id_fkey(skill_id, skills!user_skill_skill_id_fkey(id, name))`
    );

  if (error) {
    new Error("Error fetching users");
    console.log("Error fetching data with user_skill:", error);
    return [];
  } else {
    console.log("Fetched data with user_skill:", data);
  }

  const usersData = (data || []).map((user) => {
    const skill = user.user_skill.skills.name;
    return new User(
      user.name,
      user.description,
      user.github_id,
      user.qiita_id,
      user.x_id,
      user.user_id,
      skill
    );
  });

  return usersData;
};
