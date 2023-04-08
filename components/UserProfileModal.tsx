import { onValue, ref } from "firebase/database";
import { Fragment, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { db } from "../firebase";
import { PostModel } from "../types";
import Feed from "./Feed";

interface Props {
  userData: {
    username: string;
    email: string;
    profileImageUrl: string;
  };
  onClose: () => void;
}

export default function UserProfileModal({ userData, onClose }: Props) {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const dataRef = ref(db, "/posts/");
    onValue(dataRef, (snapshot) => {
      const data: any = snapshot.val();
      if (data) {
        setPosts(data.filter((d: any) => d.email === userData.email));
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed right-0 top-0 bg-white md:w-96 h-screen sm:w-screen overflow-auto">
        <section className="flex items-center gap-2 justify-between border-b py-2 px-3">
          <p>User Info</p>
          <button onClick={onClose} className="text-sm underline">
            <FiX size={20} />
          </button>
        </section>

        <section className="mx-3 mt-4 flex items-center gap-2">
          <img src={userData.profileImageUrl} alt="profile-picture" className="w-10 h-10 rounded-full" />
          <div>
            <p>{userData.username}</p>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </section>

        <section className="mt-10 mx-3">
          <h5 className="mx-2 font-bold">Posts by {userData.username}</h5>

          <Feed posts={posts} fullWidth />
        </section>
      </div>
    </Fragment>
  );
}
