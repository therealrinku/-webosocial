import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FormEvent, Fragment, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { RootContext } from "../context/RootContext";
import { ref as dbRef, set } from "firebase/database";

interface Props {
  onClose: () => void;
}

export default function UpdateProfileModal({ onClose }: Props) {
  const { userData, setUserData } = useContext(RootContext);

  const [username, setUsername] = useState<string>(userData?.username ?? "");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  function onFileUpload(e: FormEvent) {
    const files = (e.target as HTMLInputElement).files;

    if (!files) {
      return toast.error("File not found. please try again.");
    }

    if (!["jpg", "jpeg", "png"].includes(files[0].name.split(".").pop() ?? "")) {
      return toast.error("Unsupported file format. Only jpeg, jpg, png, ogg and mp4 are supported.");
    }

    try {
      const storageRef = ref(storage, `profile_pictures/${userData?.email}/${files[0].name.replaceAll("'", "")}`);
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
      set(dbRef(db, "users/" + userData?.email?.slice(0, userData?.email?.indexOf("@"))), {
        username: username,
        profileImageUrl: fileUrl,
      });

      setUserData({ ...userData, username: username, profileImageUrl: fileUrl });

      toast.success("Successfully updated the profile.");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Fragment>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed right-0 top-0 bg-white md:w-96 h-screen sm:w-screen">
        <section className="flex items-center gap-2 justify-between border-b py-2 px-3">
          <p>Update Profile</p>
          <button onClick={onClose} className="text-sm underline">
            <FiX size={20} />
          </button>
        </section>

        <form className="mt-10 px-3" onSubmit={onPost}>
          <section className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              className="border p-2 rounded-md outline-none focus:border-blue-500 text-gray-500 mb-6"
              type="text"
              value={userData?.email}
              disabled
            />
          </section>
          <section className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              id="username"
              className="border p-2 rounded-md outline-none focus:border-blue-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </section>

          <img src={userData?.profileImageUrl} alt="profile image" className="mt-5 mb-10 h-32" />

          <label htmlFor="username" className="text-sm">
            Update Profile Picture
          </label>
          <input accept=".jpeg,.jpg,.png" type="file" className="mt-2" onChange={onFileUpload} />

          {uploading && <p>Uploading: {progress} %</p>}

          <button
            disabled={uploading || !username.trim()}
            onSubmit={onPost}
            className="disabled:bg-blue-400 bg-blue-500 text-white py-2 rounded-md w-full mt-20"
          >
            Update
          </button>
        </form>
      </div>
    </Fragment>
  );
}
