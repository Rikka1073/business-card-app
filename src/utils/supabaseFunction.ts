import { supabase } from "./supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return new Error("Error fetching users");
  }

  const usersData = data.map((user) => {});
};
