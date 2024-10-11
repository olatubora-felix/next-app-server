"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { createPostAction } from "@/app/action/createPost";
import { toast } from "sonner";

export const ProfileForm = () => {
  const [values, setValues] = React.useState({ title: "", body: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlePosts = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    const res = await createPostAction(formData);

    if (!res?.success && res?.error) {
      toast.error(res?.error, {
        position: "top-right",
        className: "bg-red-500",
      });
    }
  };
  return (
    <div>
      <h1>Create Posts</h1>
      <form className="grid gap-5" onSubmit={handlePosts}>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div>
          <Label>Body</Label>
          <Textarea onChange={handleChange} value={values.body} name="body" />
        </div>
        <Button type="submit" variant={"outline"} className="">
          Submit
        </Button>
      </form>
    </div>
  );
};
