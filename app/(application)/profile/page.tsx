import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";

export default async function ProfilePage() {
  const isLoggedIn: boolean = false;
  if (!isLoggedIn) {
    return (
      <>
        <h1>Halo</h1>
      </>
    );
  } else {
    return <main>This is not Authenticated user page</main>;
  }
}
