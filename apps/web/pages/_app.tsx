import { AuthContextProvider } from "context/authContext";
import React from "react";
import { Toaster } from "react-hot-toast";

import { trpc } from "@calcom/trpc/react";

import type { AppProps } from "@lib/app-providers";

import "../styles/globals.css";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  if (Component.PageWrapper !== undefined) return Component.PageWrapper(props);
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthContextProvider>
  );
}

export default trpc.withTRPC(MyApp);
