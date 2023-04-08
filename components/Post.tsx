import { FiThumbsUp, FiTrash } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { ref as dbRef, onValue, update, remove } from "firebase/database";
import { db } from "../firebase";
import { Fragment, useContext, useState } from "react";
import { RootContext } from "../context/RootContext";
import { toast } from "react-toastify";
import { PostModel } from "../types";
import AddAndViewCommentModal from "./AddAndViewCommentModal";
import UserProfileModal from "./UserProfileModal";

interface Props {
  post: PostModel;
}

export default function Post({ post }: Props) {
  const { userData } = useContext(RootContext);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

  function onPostLike(id: number) {
    setInProgress(true);

    try {
      const dataRef = dbRef(db, `/posts/${post.id}`);

      let lastValue: Array<string> = [];
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        lastValue = data?.likedBy || [];
      });

      update(dbRef(db, "posts/" + id), {
        likedBy: lastValue ? [...lastValue, userData?.email] : [userData?.email],
      });

      toast.success("Successfully liked the post");
      setInProgress(false);
    } catch (error: any) {
      toast.error(error.message);
      setInProgress(false);
    }
  }

  function onPostUnLike(id: number) {
    try {
      const dataRef = dbRef(db, `/posts/${post.id}`);

      let lastValue: Array<string> = [];
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        lastValue = data?.likedBy || [];
      });

      update(dbRef(db, "posts/" + id), {
        likedBy: lastValue?.filter((mail) => mail !== userData?.email),
      });

      toast.success("Successfully unliked the post");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function onDeletePost(id: number) {
    const confirmed = confirm("Are you sure ?");

    if (!confirmed) return;

    try {
      remove(dbRef(db, "posts/" + id));

      toast.success("Successfully deleted the post");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Fragment>
      <div className="mb-2 md:border md:border md:rounded-md w-full">
        <section className="flex items-center gap-2 mb-1 p-2">
          <img src={post.profileImageUrl} className="w-7 h-7 rounded-full" />
          <button onClick={() => setShowUserInfoModal(true)} className="text-sm hover:underline text-gray-500">
            {post.email}
          </button>
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
          <button
            disabled={inProgress}
            className="flex items-center gap-1"
            onClick={() =>
              post.likedBy?.includes(userData?.email ?? "xxxx") ? onPostUnLike(post.id) : onPostLike(post.id)
            }
          >
            <FiThumbsUp size={20} className={post.likedBy?.includes(userData?.email ?? "xxxx") ? "text-red-500" : ""} />
            <p>{post.likedBy?.length}</p>
          </button>
          <button onClick={() => setShowCommentModal(true)} className="flex items-center gap-1">
            <BiCommentDetail size={20} />
            <p>{post.comments?.length}</p>
          </button>
        </section>

        <section className="flex items-center text-xs">
          <p className="text-gray-500 mx-2 my-3">{post.timestamp?.slice(0, post.timestamp?.indexOf("GMT"))}</p>
          {userData?.email === post.email && (
            <button onClick={() => onDeletePost(post.id)} className="mb-1 text-red-500 hover:text-red-600">
              <FiTrash size={14} />
            </button>
          )}
        </section>
      </div>

      {showCommentModal && (
        <AddAndViewCommentModal postId={post.id} comments={post.comments} onClose={() => setShowCommentModal(false)} />
      )}

      {showUserInfoModal && (
        <UserProfileModal
          userData={{ email: post.email, username: post.username, profileImageUrl: post.profileImageUrl }}
          onClose={() => setShowUserInfoModal(false)}
        />
      )}
    </Fragment>
  );
}
