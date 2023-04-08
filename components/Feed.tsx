import { Fragment, useContext, useEffect, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import AddPostModal from "./AddPostModal";
import { RootContext } from "../context/RootContext";

interface Post {
  id: number;
  imageUrl?: string;
  postType: string;
  timestamp: string;
  text?: string;
  videoUrl?: string;
  username: string;
  profileImageUrl: string;
  likesCount: number;
  likedBy: string[];
  comments: (null | {
    username: string;
    profileImage: string;
    comment: string;
  })[];
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const { userData } = useContext(RootContext);

  useEffect(() => {
    const dataRef = ref(db, "/posts/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(data.reverse());
    });
  }, []);

  return (
    <Fragment>
      <nav className="fixed top-0  left-0  w-full bg-blue-500 w-100 h-10 flex items-center justify-between px-10">
        <img className="h-20 w-20" src="https://cms.webo.digital/wp-content/uploads/2021/04/image-1.svg" />

        <section className="text-sm text-white flex items-center">
          <p>{userData?.username}</p>
          <button onClick={() => setShowAddPostModal(true)} className="mx-5 hover:text-gray-100">
            Create New Post
          </button>
        </section>
      </nav>

      <main className="mt-20 md:w-96 sm:w-screen container my-10 flex flex-col gap-10 md:mx-20 sm:mx-0">
        {posts.map((post) => {
          return (
            <div key={post.id} className="mb-2 md:border-blue-500 md:border md:rounded-md w-100">
              <section className="flex items-center gap-2 mb-1 p-2">
                <img src={post.profileImageUrl} className="w-10 h-10 rounded-full" />
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
                <img src={post.imageUrl} className="w-full h-72 cover" />
              )}

              <section className="p-2 mt-4 flex gap-5">
                <button className="flex items-center gap-1">
                  <FiThumbsUp size={20} />
                  <p>{post.likesCount}</p>
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

      {showAddPostModal && <AddPostModal newPostId={posts.length} onClose={() => setShowAddPostModal(false)} />}
    </Fragment>
  );
}
