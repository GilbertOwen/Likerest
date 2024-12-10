"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import registerUser from "../_actions/register-user";

interface RegisterAuthProps {
  changeState: () => void;
}

export default function RegisterAuth({ changeState }: RegisterAuthProps) {
  const [state, formAction] = useFormState(registerUser, {
    status: "",
    message: "",
    errors: {},
  });

  const registerForm: any = useRef(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, {
        position: "top-left",
      });
      registerForm.current.reset();
      changeState();
    } else if (state.status === "failed") {
      toast.error(state.message, {
        position: "top-left",
      });
    }
  }, [state]);
  return (
    <form
      action={formAction}
      ref={registerForm}
      className="flex flex-col gap-y-6"
    >
      <h1 className="text-3xl font-semibold border-b-2">REGISTER</h1>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="rounded-md border-2 px-2 py-1.5"
          />
          {state.errors && state.errors.username ? (
            <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
              {state.errors.username}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="rounded-md text-lg font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="rounded-md border-2 px-2 py-1.5"
          />
          {state.errors && state.errors.email ? (
            <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
              {state.errors.email}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="rounded-md border-2 px-2 py-1.5"
          />
          {state.errors && state.errors.password ? (
            <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
              {state.errors.password}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button className="text-md rounded-md font-semibold px-4 py-2 hover:bg-white border-2 border-black box-border hover:text-black w-fit bg-black text-white">
        Register
      </button>
    </form>
  );
}
