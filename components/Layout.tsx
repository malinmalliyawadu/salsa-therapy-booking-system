import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Salsa Therapy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-inter antialiased bg-gray-100 text-gray-600">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};