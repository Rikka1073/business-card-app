import { User } from "../domain/User";
import { supabase } from "./supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return new Error("Error fetching users");
  }

  const usersData = data.map((user) => {
    return new User(user.id, user.name, user.description, user.github_id, user.qiita_id, user.x_id);
  });

  return console.log(usersData);
};
