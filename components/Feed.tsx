import { Fragment } from "react";
import Post from "./Post";
import { PostModel } from "../types";

interface Props {
  posts: PostModel[];
  fullWidth?: boolean;
}

export default function Feed({ posts, fullWidth }: Props) {
  return (
    <Fragment>
      <main
        className={`${
          fullWidth ? "w-full" : "lg:w-2/6 md:w-3/6 sm:w-screen md:mx-20 sm:mx-0 mt-20"
        } mt-10 flex flex-col gap-10`}
      >
        {posts
          ?.sort((a, b) => b.id - a.id)
          .map((post) => {
            return <Post post={post} key={post.id} />;
          })}
      </main>
    </Fragment>
  );
}
