import { Fragment, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import { RootContext } from "../context/RootContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState({ email: "", username: "", profileImageUrl: "" });

  return (
    <Fragment>
      <ToastContainer />
      <RootContext.Provider
        value={{
          userData,
          setUserData,
        }}
      >
        <Meta />
        <Component {...pageProps} />
      </RootContext.Provider>
    </Fragment>
  );
}

export default MyApp;
