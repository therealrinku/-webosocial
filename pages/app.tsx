import { Fragment, useContext, useEffect, useState } from "react";
import { RootContext } from "../context/RootContext";
import { useRouter } from "next/router";
import Feed from "../components/Feed";
import AddPostModal from "../components/AddPostModal";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { FiEdit } from "react-icons/fi";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { PostModel } from "../types";

export default function App() {
  const router = useRouter();
  const { userData, setUserData } = useContext(RootContext);

  if (!userData?.email) typeof window != "undefined" && router.push("/");

  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const dataRef = ref(db, "/posts/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(data?.reverse());
    });
  }, []);

  return (
    <Fragment>
      <nav className="z-100 fixed top-0  left-0  w-full bg-blue-500 w-100 h-10 flex items-center justify-between px-10">
        <img className="h-20 w-20" src="https://cms.webo.digital/wp-content/uploads/2021/04/image-1.svg" />

        <section className="text-sm text-white flex items-center">
          <button onClick={() => setShowUpdateProfileModal(true)} className="flex items-center gap-2 hover:underline">
            <img src={userData?.profileImageUrl} alt="profile_image" className="h-6 w-6 rounded-full"/>
            {userData?.username}
            <FiEdit size={18} />
          </button>
          <button onClick={() => setShowAddPostModal(true)} className="mx-5 hover:text-gray-100">
            Create New Post
          </button>
          <button className="font-bold" onClick={() => setUserData({})}>
            Logout
          </button>
        </section>
      </nav>

      {!userData?.email && <p>Loading....</p>}
      {userData?.email && <Feed posts={posts} />}

      {showAddPostModal && <AddPostModal newPostId={posts.length} onClose={() => setShowAddPostModal(false)} />}
      {showUpdateProfileModal && <UpdateProfileModal onClose={() => setShowUpdateProfileModal(false)} />}
    </Fragment>
  );
}
