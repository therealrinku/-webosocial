import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { db, storage } from "../firebase";
import { toast } from "react-toast";
import { RootContext } from "../context/RootContext";
import { ref as dbRef, set } from "firebase/database";

interface Props {
  onClose: () => void;
  newPostId: number;
}

export default function AddPostModal({ onClose, newPostId }: Props) {
  const [postType, setPostType] = useState<string>("text");
  const [text, setText] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { userData } = useContext(RootContext);

  function onFileUpload(e: FormEvent) {
    const files = (e.target as HTMLInputElement).files;

    if (!files) {
      return toast.error("File not found. please try again.");
    }

    if (!["jpg", "jpeg", "png", "ogg", "mp4"].includes(files[0].name.split(".").pop() ?? "")) {
      return toast.error("Unsupported file format. Only jpeg, jpg, png, ogg and mp4 are supported.");
    }

    try {
      const storageRef = ref(storage, `posts/${userData?.username}/${files[0].name.replaceAll("'", "")}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);
      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          toast.error(error.message);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL);
            setUploading(false);
          });
        }
      );
    } catch (error: any) {
      toast.error(error.message);
      setUploading(false);
    }
  }

  function onPost(e: FormEvent) {
    e.preventDefault();

    try {
      set(dbRef(db, "posts/" + newPostId), {
        username: userData?.username,
        profileImageUrl: userData?.profileImageUrl,
        postType,
        text: postType === "text" ? text : null,
        videoUrl: postType === "video" ? fileUrl : null,
        imageUrl: postType === "image" ? fileUrl : null,
        likesCount: 0,
        comments: [],
        likedBy: [],
        id: newPostId,
        timestamp: new Date().toString(),
      });

      toast.success("Successfully posted.");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="fixed right-0 top-0 bg-blue-600 w-96 h-screen p-2 text-white">
      <section className="flex items-center gap-2 justify-between">
        <p>Add New Post</p>
        <button onClick={onClose} className="text-sm underline">
          <FiX size={20} />
        </button>
      </section>

      <form className="mt-10" onSubmit={onPost}>
        <div>
          <h5 className="text-sm font-bold">Post Type</h5>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="post-type"
            id="text"
            value="text"
            onChange={(e) => setPostType(e.target.value)}
            checked={postType === "text"}
          />{" "}
          <label htmlFor="text">Text</label>
          <input
            type="radio"
            name="post-type"
            value="image"
            id="image"
            onChange={(e) => setPostType(e.target.value)}
            checked={postType === "image"}
          />
          <label htmlFor="image">Image</label>
          <input
            type="radio"
            name="post-type"
            value="video"
            id="video"
            onChange={(e) => setPostType(e.target.value)}
            checked={postType === "video"}
          />
          <label htmlFor="video">Video</label>
        </div>

        {postType == "text" ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-inherit outline-none border rounded-sm w-full mt-10 p-2"
            required
          />
        ) : (
          <input accept=".jpeg,.jpg,.png,.ogg,.mp4" type="file" className="mt-10" required onChange={onFileUpload} />
        )}

        {uploading && <p>Uploading: {progress} %</p>}

        <button disabled={uploading} onSubmit={onPost} className="bg-red-500 py-2 rounded-md w-full mt-20">
          Post
        </button>
      </form>
    </div>
  );
}
