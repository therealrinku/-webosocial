import { Fragment } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { PostModel } from "../pages/app";

interface Props{
  posts:PostModel[]
}

export default function Feed({posts}:Props) {
  return (
    <Fragment>
      <main className="mt-20 lg:w-2/6 md:w-3/6 sm:w-screen my-10 flex flex-col gap-10 md:mx-20 sm:mx-0">
        {posts.map((post) => {
          return (
            <div key={post.id} className="mb-2 md:border md:border md:rounded-md w-full">
              <section className="flex items-center gap-2 mb-1 p-2">
                <img src={post.profileImageUrl} className="w-7 h-7 rounded-full" />
                <p>{post.username}</p>
              </section>

              {post.postType === "text" ? (
                <p className="p-2">{post.text}</p>
              ) : post.postType === "video" ? (
                <video width="100%" height="240" controls autoPlay>
                  <source src={post.videoUrl} type="video/mp4" />
                  <source src={post.videoUrl} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={post.imageUrl} className="w-full h-96 cover" />
              )}

              <section className="p-2 mt-4 flex gap-5">
                <button className="flex items-center gap-1">
                  <FiThumbsUp size={20} />
                  <p>{post.likedBy?.length}</p>
                </button>
                <button className="flex items-center gap-1">
                  <BiCommentDetail size={20} />
                  <p>{post.comments?.length}</p>
                </button>
                <p className="text-sm">{post.timestamp?.slice(0, post.timestamp?.indexOf("GMT"))}</p>
              </section>
            </div>
          );
        })}
      </main>
    </Fragment>
  );
}
