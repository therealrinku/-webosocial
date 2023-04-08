import type { NextPage } from "next";
import { Fragment } from "react";
import { ImGoogle } from "react-icons/im";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Home: NextPage = () => {
  async function onGoogleLogin() {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
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
