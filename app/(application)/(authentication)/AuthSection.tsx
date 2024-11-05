"use client";
import { useState } from "react";
import LoginAuth from "./_components/Login";
import RegisterAuth from "./_components/Register";
import { motion } from "framer-motion";

export default function AuthSection() {
  const [authType, setAuthType] = useState<string>("register");
  return (
    <div
      className="min-h-screen snap-always snap-center px-10 py-10 flex md:gap-y-0 gap-y-12 md:gap-x-8 lg:gap-x-12 flex-col md:flex-row justify-center md:justify-between items-center"
      id="login"
    >
      <motion.div initial={{ y:-50, opacity:0 }} whileInView={{ y:0, opacity:1, transition:{duration:0.5} }} id="auth-content" className="md:order-2 order-1 w-full md:w-1/2 flex flex-col md:px-4 gap-y-4">
        <h2 className="text-3xl md:text-2xl lg:text-3xl font-semibold">Yapping</h2>
        <p className="text-sm lg:text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Aliquam, facere! Unde
          debitis at aliquid?
        </p>
      </motion.div>
      <motion.div initial={{ y:-50, opacity:0 }} whileInView={{ y:0, opacity:1, transition:{duration:0.5, delay:0.3} }} className="w-full md:w-1/2 md:order-1 order-2  flex flex-col gap-y-4">
        <div id="choose" className="flex flex-row gap-x-2">
          <button
            onClick={() => {
              setAuthType("register");
            }}
            className={`text-xl px-4 py-1.5 border-2 ${
              authType == "register"
                ? "bg-black text-white"
                : "text-black bg-white"
            } border-black font-semibold`}
          >
            Register
          </button>
          <button
            onClick={() => setAuthType("login")}
            className={`text-xl px-4 py-1.5 border-black ${
              authType == "login"
                ? "bg-black text-white"
                : "text-black bg-white"
            } border-2 font-semibold`}
          >
            Login
          </button>
        </div>
        <div className="w-full h-fit border-2 py-4 px-4 border-black">
          {authType == "login" ? <LoginAuth /> : <RegisterAuth />}
        </div>
      </motion.div>
    </div>
  );
}
