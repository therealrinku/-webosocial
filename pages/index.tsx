import type { NextPage } from "next";
import { Fragment, useContext } from "react";
import { ImGoogle } from "react-icons/im";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { RootContext } from "../context/RootContext";
import { useRouter } from "next/router";
import { ref, onValue } from "firebase/database";

const Home: NextPage = () => {
  const { setUserData } = useContext(RootContext);
  const router = useRouter();

  async function onGoogleLogin() {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);

      let customProfileData = { username: "", profileImageUrl: "" };

      const dataRef = ref(db, `/users/${res.user?.email?.slice(0,res.user?.email?.indexOf("@"))}`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data,"snapshot")
        customProfileData.username = data.username;
        customProfileData.profileImageUrl = data.profileImageUrl;
      });

      setUserData({
        username: customProfileData.username || res.user.displayName,
        email: res.user.email,
        profileImageUrl: customProfileData.profileImageUrl || res.user.photoURL,
      });

      router.push("/app");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <Fragment>
      <section className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">Webosocial</h1>

            <p className="mt-4 sm:text-xl text-red-500">Best social media application. Get started now.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="rounded bg-blue-600 px-12 py-3 text-white shadow hover:bg-blue-700 sm:w-auto flex items-center gap-2"
                onClick={onGoogleLogin}
              >
                <ImGoogle />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
