"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="py-4 snap-none px-6 gap-x-4 flex flex-row items-center justify-between border-2 fixed top-0 w-full z-[500] bg-white">
      <h1 className="text-3xl font-bold py-1.5">
        LIKEREST
      </h1>
      <div className="w-full px-4 relative hidden md:flex">
        <input
          type="text"
          placeholder="Explore the world"
          className="bg-[rgba(0,0,0,0.05)] w-full placeholder:text-[rgba(0,0,0,0.5)] focus:bg-[rgba(0,0,0,0)] font-medium text-black rounded-full py-2 pl-10 pr-4"
        />
        <FaSearch
          className="absolute top-[12px] left-8 text-[rgba(0,0,0,0.2)]"
          size={15}
        />
      </div>

      {/* Desktop version */}
      <ul className="hidden md:flex flex-row items-center gap-x-2">
        <Link
          href={"/"}
          className={`px-4 py-2 font-semibold rounded-full ${
            pathname === "/" ? "bg-black text-white" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href={"/explore"}
          className={`px-4 py-2 hover:bg-black hover:text-white rounded-full transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white " : "text-black"
          }`}
        >
          Explore
        </Link>
        <Link
          href={"/create-post"}
          className={`px-4 py-2 hover:bg-black hover:text-white rounded-full transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white " : "text-black"
          }`}
        >
          Create
        </Link>
      </ul>
      <ul className="hidden md:flex flex-row items-center gap-x-2">
        <Link
          href={"/#login"}
          className={`px-4 py-2  rounded-full transition-all font-semibold bg-white border-2 border-black`}
        >
          SignUp
        </Link>
      </ul>

      {/* Mobile version of navbar */}
      <ul
        className={`md:hidden flex flex-col  bg-white min-h-screen sm:border-l-2 w-full sm:w-[50%] overflow-hidden top-0 right-0 fixed z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full sm:translate-x-[100%]"
        } transition-all`}
      >
        <div className="px-4 py-4 flex flex-row justify-between">
          <h1 className="text-3xl font-bold underline underline-offset-4 py-1.5">
            LIKEREST
          </h1>
          <GiHamburgerMenu
            className="md:hidden flex w-fit ml-auto cursor-pointer hover:bg-black rounded-full hover:text-white duration-100 py-2 px-2"
            size={44}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="w-full relative flex">
          <input
            type="text"
            placeholder="Explore the world"
            className="bg-[rgba(0,0,0,0.05)] w-full focus:bg-[rgba(0,0,0,0)] font-medium text-black py-4 pl-10 pr-4"
          />
          <FaSearch
            className="absolute top-[18px] left-4 text-[rgba(0,0,0,0.2)]"
            size={15}
          />
        </div>
        <Link
          href={"/"}
          className={`px-4 py-4 font-semibold ${
            pathname === "/" ? "bg-black text-white" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href={"/explore"}
          className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white " : "text-black"
          }`}
        >
          Explore
        </Link>
        <Link
          href={"/create-post"}
          className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white " : "text-black"
          }`}
        >
          Create
        </Link>
        <Link
          href={"/#login"}
          className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white " : "text-black"
          }`}
        >
          Sign Up
        </Link>
      </ul>
      <GiHamburgerMenu
        className={`${
          isOpen ? "hidden md:flex" : "md:hidden flex"
        }w-fit cursor-pointer hover:bg-black rounded-full hover:text-white duration-100 px-2`}
        size={44}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
