import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch posts",
      },
      { status: 403 }
    );
  }

  const response: Postresponse = {
    success: true,
    data: posts,
  };

  return NextResponse.json(response, {
    status: 200,
  });
}

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
