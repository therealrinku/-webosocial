import { Fragment } from "react";
import Post from "./Post";
import { PostModel } from "../types";

interface Props {
  posts: PostModel[];
}

export default function Feed({ posts }: Props) {
  return (
    <Fragment>
      <main className="mt-20 lg:w-2/6 md:w-3/6 sm:w-screen my-10 flex flex-col gap-10 md:mx-20 sm:mx-0">
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </main>
    </Fragment>
  );
}
