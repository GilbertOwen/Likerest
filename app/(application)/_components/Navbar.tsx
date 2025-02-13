"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  // const [firstTime, setFirstTime] = useState<Boolean>(false);

  const checkAuth = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/getCookies`);
    setIsAuthenticated(response.ok);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  return (
    <div className="py-4 snap-none px-6 gap-x-4 flex flex-row items-center justify-between border-2 fixed top-0 w-full z-[10] bg-white">
      {/* {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )} */}

      <Link
        href={isAuthenticated ? "/explore" : "/"}
        className={`text-[34px] font-bold py-1 ${
          isLoading ? "pointer-events-none " : ""
        }`}
      >
        LIKEREST
      </Link>

      <div className="w-full px-4 relative hidden md:flex">
        {pathname === "/" ? (
          <Link
            href={"/explore"}
            className={`px-4 py-2 font-semibold rounded-full bg-[rgba(0,0,0,0.8)] hover:bg-black text-white ${
              isLoading ? "pointer-events-none " : ""
            }`}
          >
            Explore
          </Link>
        ) : (
          <>
            <input
              type="text"
              placeholder="Explore the world"
              className="bg-[rgba(0,0,0,0.05)] w-full placeholder:text-[rgba(0,0,0,0.5)] focus:bg-[rgba(0,0,0,0)] font-medium text-black rounded-full py-2 pl-10 pr-4"
            />
            <FaSearch
              className="absolute top-[12px] left-8 text-[rgba(0,0,0,0.2)]"
              size={15}
            />
          </>
        )}
      </div>

      {/* Desktop Navbar */}
      <ul className="hidden md:flex flex-row items-center gap-x-4">
        <Link
          href={"/explore"}
          className={`px-4 py-2 hover:bg-black hover:text-white rounded-full transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white" : "text-black"
          } ${isLoading ? "pointer-events-none " : ""}`}
        >
          Explore
        </Link>
        {isAuthenticated && (
          <Link
            href={"/create-post"}
            className={`px-4 py-2 hover:bg-black hover:text-white rounded-full transition-all font-semibold ${
              pathname === "/create-post" ? "bg-black text-white" : "text-black"
            } ${isLoading ? "pointer-events-none " : ""}`}
          >
            Create
          </Link>
        )}
      </ul>

      {!isAuthenticated && (
        <ul className="hidden md:flex flex-row items-center gap-x-2">
          <Link
            href={"/#login"}
            className={`px-4 py-2 rounded-full w-full text-nowrap transition-all font-semibold border-2 border-black ${
              isLoading ? "pointer-events-none " : "bg-white"
            }`}
          >
            Sign Up
          </Link>
        </ul>
      )}

      {isAuthenticated && (
        <ul className="hidden md:flex flex-row items-center gap-x-2 mx-2">
          <Link href={"/profile"}>
            <CgProfile
              size={40}
              className="cursor-pointer hover:bg-black bg-white rounded-full text-black hover:text-white border-black outline-black"
            />
          </Link>
        </ul>
      )}

      {/* Mobile Navbar */}
      <ul
        className={`md:hidden flex flex-col bg-white min-h-screen sm:border-l-2 w-full sm:w-[50%] overflow-hidden top-0 right-0 fixed z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full sm:translate-x-[100%]"
        } transition-all`}
      >
        <div className="px-4 py-4 flex flex-row justify-between">
          <h1 className="text-3xl font-bold py-1.5">LIKEREST</h1>
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
          } ${isLoading ? "pointer-events-none " : ""}`}
        >
          Home
        </Link>
        <Link
          href={"/explore"}
          className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
            pathname === "/explore" ? "bg-black text-white" : "text-black"
          } ${isLoading ? "pointer-events-none " : ""}`}
        >
          Explore
        </Link>
        {isAuthenticated && (
          <Link
            href={"/create-post"}
            className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
              pathname === "/create-post" ? "bg-black text-white" : "text-black"
            } ${isLoading ? "pointer-events-none " : ""}`}
          >
            Create
          </Link>
        )}
        {!isAuthenticated && (
          <Link
            href={"/#login"}
            className={`px-4 py-4 hover:bg-black hover:text-white transition-all font-semibold ${
              pathname === "/explore" ? "bg-black text-white" : "text-black"
            } ${isLoading ? "pointer-events-none " : ""}`}
          >
            Sign Up
          </Link>
        )}
      </ul>

      {/* Hamburger Menu */}
      <GiHamburgerMenu
        className={`${
          isOpen ? "hidden md:flex" : "md:hidden flex"
        } w-fit cursor-pointer hover:bg-black rounded-full hover:text-white duration-100 px-2`}
        size={36}
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
