import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import Hero from "./_components/Hero";
import AuthSection from "./(authentication)/AuthSection";

export default async function HomePage() {
  const isLoggedIn: boolean = false;
  if (!isLoggedIn) {
    return (
      <Fragment>
        <Hero></Hero>
        <AuthSection></AuthSection>
      </Fragment>
    );
  } else {
    return <main>This is not Authenticated user page</main>;
  }
}
