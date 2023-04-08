import { Fragment } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Meta />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
