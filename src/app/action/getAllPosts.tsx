import { createClient } from "@/lib/supabase/server";

export const allPosts = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    return {
      error: "Failed to fetch posts",
      success: false,
    };
  }
  return {
    success: true,
    data: posts,
  } as Postresponse;
};
export interface Postresponse {
  success: boolean;
  data: Posts[];
}

export interface Posts {
  id: string;
  created_at: string;
  title: string;
  body: string;
}
