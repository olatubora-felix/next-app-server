"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPostAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!title || !body) {
    return {
      error: "Please fill in all fields",
      success: false,
    };
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        body,
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error.message);
    return {
      error: "Failed to create post",
      success: false,
    };
  }

  revalidatePath("/posts");
  redirect("/posts?created=success");
};
