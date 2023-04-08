import type { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";

const Home: NextPage = () => {
  return (
    <Fragment>
      <section className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">Webosocial</h1>

            <p className="mt-4 sm:text-xl text-red-500">Login or signup to get started now</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="rounded bg-blue-600 px-12 py-3 text-white shadow hover:bg-blue-700 sm:w-auto"
                href="/login"
              >
                Login
              </Link>

              <Link className="rounded px-12 py-3 text-blue-600 shadow hover:text-blue-700 sm:w-auto" href="/signup">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
