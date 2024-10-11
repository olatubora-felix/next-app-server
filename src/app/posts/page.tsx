import React from "react";
import { allPosts, Postresponse } from "../action/getAllPosts";

const page = async () => {
  const getAllPosts = (await allPosts()) as Postresponse;
  const posts = getAllPosts.data;
  return (
    <main className="p-10">
      <h1>Posts</h1>
      <ul className="space-y-6">
        {posts?.map((post, i) => (
          <li key={post.id}>
            <span>{i + 1}</span>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default page;
