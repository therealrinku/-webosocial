import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiArrowLeft, FiInfo, FiUserPlus } from "react-icons/fi";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }
  
  return (
    <div className="w-full max-w-md my-10 mx-auto">
      <Link href="/" className="flex items-center gap-2 text-sm mb-3 hover:underline hover:text-blue-500">
        <FiArrowLeft />
        Go Back to home
      </Link>
      <h5 className="font-bold text-lg">Signup</h5>
      <form
        onSubmit={onSubmit}
        className="bg-white mt-5 shadow-md rounded border  px-5 pt-6 pb-8 flex flex-col gap-5 mb-5"
      >
        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="username"
            type="text"
          />
        </section>

        <section>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm shadow  border rounded w-full py-2 px-3 text-gray-700 outline-none "
            id="password"
            type="password"
          />
        </section>

        <div>
          <p className="flex gap-1 items-center text-sm">
            <FiInfo color="red" />
            <span>Password must be 8 characters long.</span>
          </p>
        </div>

        <button className="mt-5 hover:bg-blue-600 disabled:bg-blue-400 bg-blue-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center">
          <FiUserPlus /> Signup
        </button>
      </form>

      <Link href="/login" className="underline text-sm">
        Have an account? Login
      </Link>
    </div>
  );
}
