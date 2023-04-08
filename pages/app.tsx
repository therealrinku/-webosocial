import { Fragment, useContext } from "react";
import { RootContext } from "../context/RootContext";
import { useRouter } from "next/router";
import Feed from "../components/Feed";

export default function App() {
  const { userData } = useContext(RootContext);
  const router = useRouter();

  if (!userData?.email) typeof window != "undefined" && router.push("/");

  return (
    <Fragment>
      {!userData?.email && <p>Loading....</p>}
      {userData?.email && <Feed />}
    </Fragment>
  );
}
