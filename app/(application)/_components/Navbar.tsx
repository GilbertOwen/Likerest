"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="py-4 snap-none px-6 gap-x-4 flex flex-row items-center justify-between border-2 fixed top-0 w-full z-[500] bg-white">
      <h2 className="text-3xl font-bold underline underline-offset-4">LOOKEREST</h2>
      <div className="w-full px-4 relative">
        <input
          type="text"
          placeholder="Explore the world"
          className="bg-[rgba(0,0,0,0.05)] w-full placeholder:text-[rgba(0,0,0,0.5)] focus:bg-[rgba(0,0,0,0)] font-medium text-black rounded-full py-2 pl-10 pr-4"
        />
        <FaSearch className="absolute top-[12px] left-8 text-[rgba(0,0,0,0.2)]" size={15}/>
      </div>
      <ul className="flex flex-row items-center gap-x-2">
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
      <ul className="flex flex-row items-center gap-x-2">
        <Link
          href={"/#login"}
          className={`px-4 py-2  rounded-full transition-all font-semibold bg-white border-2 border-black`}
        >
          SignUp
        </Link>
      </ul>
    </div>
  );
}
