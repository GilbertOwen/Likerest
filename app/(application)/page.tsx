import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import Hero from "./_components/Hero";

export default async function HomePage() {
  const isLoggedIn: boolean = false;
  if (!isLoggedIn) {
    return (
      <Fragment>
        <Hero></Hero>
        <div
          className="min-h-screen snap-always snap-center flex flex-col lg:flex-row items-center"
          id="login"
        >
          login section
        </div>
      </Fragment>
    );
  } else {
    return <main>This is not Authenticated user page</main>;
  }
}
