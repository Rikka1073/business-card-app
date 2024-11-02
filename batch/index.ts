import "dotenv/config";
import { supabase } from "../src/utils/supabase";

export const index = async () => {
  const dleteUserSkill = async (user_id: string) => {
    const { data, error } = await supabase.from("user_skill").delete().eq("user_id", user_id);
    if (error) {
      console.log("Error fetching data with user_skill:", error);
    } else {
      console.log("Fetched data with user_skill:", data);
    }
  };

  const dleteUser = async (user_id: string) => {
    const { data, error } = await supabase.from("users").delete().eq("user_id", user_id);
    if (error) {
      console.log("Error fetching data with users:", error);
    } else {
      console.log("Fetched data with users:", data);
    }
  };

  await dleteUserSkill("aaa");
  await dleteUser("aaa");
};

index();
