"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [contentDesc, setContentDesc] = useState<string>(
    "Now you can easily get those kind of things by using our app. Don't miss out on exclusive deals and new arrivals tailored to your interests. Start exploring now and make your shopping experience better than ever!"
  );
  return (
    <div
      className="min-h-screen bg-black pb-[120px] px-10 grid lg:grid-cols-2 gap-y-4 grid-cols-1"
      id="hero"
    >
      <div className=" w-full flex flex-col items-center h-full relative">
        {/* Laptop version */}
        <Link
          href={"/explore"}
          className="relative group hidden xl:w-4/5 w-full mx-auto h-full lg:flex"
        >
          <span className="text-2xl bg-white absolute top-[45%] left-[35%] group-hover:opacity-100 opacity-0 duration-[600ms] ease-in-out rounded-full shadow-xl z-[100] w-fit h-fit px-4 py-1.5 text-black">
            Explore Now
          </span>
          <div className="relative w-full h-full">
            <Image
              width={0}
              height={0}
              className="w-[200px] absolute  bottom-20 rounded-3xl left-4 shadow-lg group-hover:brightness-[70%] duration-300 ease-in-out z-[20] h-[200px] object-cover"
              sizes="100vw"
              src={"/hero-image1.jpg"}
              alt={""}
            ></Image>
            <Image
              width={0}
              height={0}
              className="w-[180px] absolute  top-20 rounded-3xl left-20  z-[20] shadow-lg h-[200px] group-hover:brightness-[70%] duration-300 ease-in-out object-cover"
              sizes="100vw"
              src={"/hero-image2.jpg"}
              alt={""}
            ></Image>
            <Image
              width={0}
              height={0}
              className="w-[200px] absolute  bottom-[20%] z-[30] rounded-3xl right-[10%] group-hover:brightness-[70%] duration-300 ease-in-out shadow-lg h-[300px] object-cover"
              sizes="100vw"
              src={"/hero-image3.jpg"}
              alt={""}
            ></Image>
            <Image
              width={0}
              height={0}
              className="w-[200px] absolute  bottom-[30%] z-[30] rounded-3xl left-[30%] group-hover:brightness-[70%] duration-300 ease-in-out shadow-lg h-[300px] object-cover"
              sizes="100vw"
              src={"/hero-image4.jpg"}
              alt={""}
            ></Image>
          </div>
        </Link>
        {/* Mobile version */}
        <Link
          className="relative group grid-cols-4 w-full mt-8 h-full lg:hidden grid rounded-md overflow-hidden"
          href={"/"}
        >
          <span className="absolute top-0 left-0 bottom-0 right-0 transition-opacity opacity-0 z-[10] group-hover:opacity-100 bg-[rgba(0,0,0,0.5)] justify-center flex items-center font-semibold text-2xl text-white">
            Explore Now
          </span>

          <Image
            width={0}
            height={0}
            className="object-cover w-full h-full brightness-95"
            sizes="100vw"
            src={"/hero-image1.jpg"}
            alt={""}
          ></Image>
          <Image
            width={0}
            height={0}
            className="object-cover w-full h-full brightness-95"
            sizes="100vw"
            src={"/hero-image2.jpg"}
            alt={""}
          ></Image>
          <Image
            width={0}
            height={0}
            className="object-cover w-full h-full brightness-95"
            sizes="100vw"
            src={"/hero-image3.jpg"}
            alt={""}
          ></Image>
          <Image
            width={0}
            height={0}
            className="object-cover w-full h-full brightness-95"
            sizes="100vw"
            src={"/hero-image4.jpg"}
            alt={""}
          ></Image>
        </Link>
      </div>
      <div className="text-white w-full h-full justify-start lg:justify-center flex flex-col">
        <h2 className="text-5xl md:text-7xl font-bold">HoYa!</h2>
        <h5 className="text-2xl md:text-4xl font-semibold mb-4 capitalize">
          Looking for these kind of things?
        </h5>
        <p className="mb-8 text-[14px] md:text-base">{contentDesc}</p>
        <Link
          href={"/explore"}
          className="text-xl md:text-2xl w-fit transition-all hover:bg-[rgba(255,255,255,.5)] rounded-full font-bold px-6 capitalize py-2 bg-white text-black"
        >
          Click here
        </Link>
      </div>
    </div>
  );
}
