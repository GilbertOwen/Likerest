"use client";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type FormLoginValues = {
  emailOrUsername: string;
  password: string;
};

export default function LoginAuth() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const nextAuthCallbackUrl = queryParams.get("callbackUrl");

  const [formLoginValues, setFormLoginValues] = useState<FormLoginValues>({
    emailOrUsername: "",
    password: "",
  });

  const [credentialError, setCredentialError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<number>(50); // Awal di tengah
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const login = async (
    formLoginValues: FormLoginValues,
    nextAuthCallbackUrl: string | null
  ) => {
    setLoading(true);
    setCredentialError(false);
    let response: any;
    try {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/login`,
        {
          username: formLoginValues.emailOrUsername,
          password: formLoginValues.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are stored
        }
      );

      if (response.status === 401) {
        setCredentialError(true);
      } else {
        const token = response.headers["auth"];
        Cookies.set("auth", token, { path: "/" });

        if (nextAuthCallbackUrl) {
          window.location.href = nextAuthCallbackUrl;
        } else {
          toast.success("Successfully logged in!", { position: "top-left" });
          router.refresh(); // ✅ Update the state
          setTimeout(() => {
            window.location.reload(); // ✅ Force refresh to update navbar
          }, 100); // Short delay to ensure state updates first
        }
      }
    } catch (error) {
      toast.error("Failed to log into the account", {
        position: "top-left",
      });
      setCredentialError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    if (
      formLoginValues.emailOrUsername.length === 0 ||
      formLoginValues.password.length === 0
    ) {
      setCredentialError(true);
      if (containerRef.current && buttonRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const buttonWidth = buttonRef.current.clientWidth;
        const maxLeft = containerWidth - buttonWidth - 10;
        let newLeft = Math.random() * maxLeft;
        setButtonPosition(newLeft);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <h1 className="text-3xl font-semibold border-b-2">LOGIN</h1>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col">
          <label htmlFor="username_email" className="text-lg font-medium">
            Username / Email
          </label>
          <input
            type="text"
            id="username_email"
            value={formLoginValues.emailOrUsername}
            onChange={(e) =>
              setFormLoginValues({
                ...formLoginValues,
                emailOrUsername: e.target.value,
              })
            }
            className="rounded-md border-2 px-2 py-1.5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formLoginValues.password}
            onChange={(e) =>
              setFormLoginValues({
                ...formLoginValues,
                password: e.target.value,
              })
            }
            className="rounded-md border-2 px-2 py-1.5"
            onKeyUp={(e) => {
              if (e.key === "Enter") login(formLoginValues, nextAuthCallbackUrl);
            }}
          />
        </div>
        {credentialError && (
          <p className="text-xs text-red-500 mt-1 font-medium">
            Wrong credential information
          </p>
        )}
      </div>
      <div ref={containerRef} className="relative w-full mt-2" style={{ height: "40px" }}>
        <button
          ref={buttonRef}
          onClick={() => {
            if (
              formLoginValues.emailOrUsername.length === 0 ||
              formLoginValues.password.length === 0
            ) {
              setCredentialError(true);
            } else {
              login(formLoginValues, nextAuthCallbackUrl);
            }
          }}
          onMouseEnter={handleMouseEnter}
          disabled={loading}
          style={{
            position: "absolute",
            left: `${buttonPosition}px`,
            transition: "left 0.1s ease-in-out",
          }}
          className={`text-md rounded-md font-semibold px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black ${
            formLoginValues.emailOrUsername.length === 0 ||
            formLoginValues.password.length === 0
              ? " cursor-not-allowed"
              : ""
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
}
