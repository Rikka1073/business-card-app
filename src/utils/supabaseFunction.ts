import { s } from "framer-motion/client";
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

export const createUser = async (
  userId: string,
  name: string,
  introduce: string,
  githubId: string,
  qiitaId: string,
  xId: string
) => {
  const { data, error } = await supabase
    .from("users")
    .insert({
      user_id: userId,
      name: name,
      description: introduce,
      github_id: githubId,
      qiita_id: qiitaId,
      x_id: xId,
    })
    .select();

  if (error) {
    console.log("Error fetching data with users:", error);
  } else {
    console.log("Fetched data with users:", data);
  }
};

export const createSkill = async (skill: string) => {
  const { data, error } = await supabase
    .from("skills")
    .insert({
      name: skill,
    })
    .select();

  if (error) {
    console.log("Error fetching data with skills:", error);
  } else {
    console.log("Fetched data with skills:", data);
    return data[0].id;
  }
};

export const createUserSkill = async (userId: string, skill_id: string) => {
  const skillId = await createSkill(skill_id);
  console.log("skillId", skillId);
  const { data, error } = await supabase
    .from("user_skill")
    .insert({
      user_id: userId,
      skill_id: skillId,
    })
    .select();

  if (error) {
    console.log("Error fetching data with user_skill:", error);
  } else {
    console.log("Fetched data with user_skill:", data);
  }
};
