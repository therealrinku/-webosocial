import { FormEvent, Fragment, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { RootContext } from "../context/RootContext";
import { ref as dbRef, onValue, update } from "firebase/database";
import { CommentModel } from "../types";

interface Props {
  onClose: () => void;
  postId: number;
  comments?: CommentModel[];
}

export default function AddAndViewCommentModal({ onClose, postId, comments }: Props) {
  const [text, setText] = useState<string>("");
  const { userData } = useContext(RootContext);

  function onPostComment(e: FormEvent) {
    e.preventDefault();
    try {
      const dataRef = dbRef(db, `posts/${postId}`);

      let lastValue: Array<{ id: number }> = [];
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        lastValue = data?.comments || [];
      });

      const newComment = {
        id: comments?.length || 0,
        username: userData?.username,
        email: userData?.email,
        profileImageUrl: userData?.profileImageUrl,
        comment: text,
        timestamp: new Date().toString(),
      };

      update(dbRef(db, "posts/" + postId), {
        comments: lastValue ? [...lastValue, newComment] : [newComment],
      });

      toast.success("Successfully commented on the post");
      setText("");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Fragment>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed right-0 top-0 bg-white md:w-96 h-screen sm:w-screen overflow-auto">
        <section className="flex items-center gap-2 justify-between border-b py-2 px-3">
          <p>Comments</p>
          <button onClick={onClose} className="text-sm underline">
            <FiX size={20} />
          </button>
        </section>

        <form className="px-3" onSubmit={onPostComment}>
          <textarea
            placeholder="What do you think about this?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 outline-none focus:border-blue-500 border mt-4 w-full rounded-md"
          />
          <button
            disabled={!text.trim()}
            className="disabled:bg-blue-400 bg-blue-500 text-white py-2 rounded-md w-full mt-20"
          >
            Post Comment
          </button>
        </form>

        {comments && comments.length > 0 && (
          <section className="mt-8 mx-3">
            <h5 className="mx-2 font-bold">Comments</h5>
            {comments
              ?.sort((a, b) => b.id - a.id)
              .map((comment) => {
                return (
                  <div key={comment.id} className="text-sm border-b py-3">
                    <section className="flex items-center gap-2 mb-1 p-2">
                      <img src={comment.profileImageUrl} className="w-7 h-7 rounded-full" />
                      <p>{comment.username}</p>
                    </section>

                    <p className="mx-2 mt-3">{comment.comment}</p>
                    <p className="mx-2 mt-3 text-gray-500 text-xs">
                      {comment.timestamp?.slice(0, comment.timestamp?.indexOf("GMT"))}
                    </p>
                  </div>
                );
              })}
          </section>
        )}
      </div>
    </Fragment>
  );
}
