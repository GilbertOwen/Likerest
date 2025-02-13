"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import updateProfile from "../_actions/update-profile";
import { toast } from "react-toastify";

interface User {
  username: string;
  frontName: string;
  rearName: string;
  biodata: string;
  imageUrl: string;
}

export default function FormEditProfile({ user }: { user: User }) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateProfile, {
    message: "",
    status: "",
    errors: {},
  });
  const [newUserProfile, setNewUserProfile] = useState({
    username: user.username,
    frontName: user.frontName,
    rearName: user.rearName,
    biodata: user.biodata,
    imageUrl: user.imageUrl,
  });
  const [isChanged, setIsChanged] = useState(false);
  const handleBack = (e: any) => {
    const backdropTask: any = document.getElementById("backdrop-profile");
    if (e.target.className === backdropTask.className) {
      router.back();
    } else {
      return;
    }
  };
  const cancelChanges = () => {
    setNewUserProfile({
      username: user.username,
      frontName: user.frontName,
      rearName: user.rearName,
      biodata: user.biodata,
      imageUrl: user.imageUrl,
    });
    setIsChanged(false);
  };
  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message, {
        position: "top-left",
      });
    } else if (state.status === "error") {
      toast.error(state.message, {
        position: "top-left",
      });
    }
  }, [state]);
  return (
    <div
      onClick={(e) => handleBack(e)}
      id="backdrop-profile"
      className="fixed flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 z-[150] bg-[rgba(0,0,0,0.5)] "
    >
      <div className="w-[90%] sm:w-[80%] md:w-[70%] py-4 px-6 flex flex-col md:gap-y-4 md:flex-row h-fit border-r-2 bg-white rounded-lg">
        <div
          className="flex flex-col flex-1 gap-y-2 md:pb-0 pb-2 mb-2 md:mb-0 border-[#a5a5a5] md:border-b-0 border-b-2"
          id="profile-information"
        >
          <h1 className="text-3xl font-medium">Edit profile</h1>
          <p className="text-sm sm:text-md w-full sm:w-[100%] md:w-[80%] lg:w-[100%]">
            Keep your privacy details private. The information you add here
            visible to anyone who can see your profile.
          </p>
        </div>
        <form
          action={formAction}
          id="profile-form"
          className="flex flex-col flex-1 ml-0 md:pl-4 md:ml-4 gap-y-4 border-[#a5a5a5] md:border-l-2"
        >
          <CgProfile
            size={40}
            className="cursor-pointer hover:bg-black bg-white rounded-full text-black hover:text-white border-black outline-black"
          />
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setIsChanged(true);
                setNewUserProfile({
                  ...newUserProfile,
                  username: e.target.value,
                });
              }}
              value={newUserProfile.username}
              className="border-2 border-[#a5a5a5] text-md px-2 py-1.5 rounded-md"
            />
            {state.errors && state.errors.username ? (
              <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
                {state.errors.username}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 lg:flex-row">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="frontName" className="text-sm font-medium">
                Front Name
              </label>
              <input
                type="text"
                id="frontName"
                name="frontName"
                onChange={(e) => {
                  setIsChanged(true);
                  setNewUserProfile({
                    ...newUserProfile,
                    frontName: e.target.value,
                  });
                }}
                value={newUserProfile.frontName}
                className="border-2 border-[#a5a5a5] text-md px-2 py-1.5 rounded-md"
              />
              {state.errors && state.errors.frontName ? (
                <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
                  {state.errors.frontName}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="rearName" className="text-sm font-medium">
                Rear Name
              </label>
              <input
                type="text"
                id="rearName"
                onChange={(e) => {
                  setIsChanged(true);
                  setNewUserProfile({
                    ...newUserProfile,
                    rearName: e.target.value,
                  });
                }}
                value={newUserProfile.rearName}
                name="rearName"
                className="border-2 border-[#a5a5a5] text-md px-2 py-1.5 rounded-md"
              />
              {state.errors && state.errors.rearName ? (
                <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
                  {state.errors.rearName}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="biodata" className="text-sm font-medium">
              About
            </label>
            <textarea
              style={{ height: "60px" }}
              id="biodata"
              onChange={(e) => {
                setIsChanged(true);
                setNewUserProfile({
                  ...newUserProfile,
                  biodata: e.target.value,
                });
              }}
              value={newUserProfile.biodata}
              name="biodata"
              className="border-2 border-[#a5a5a5] text-md px-2 py-1.5 rounded-md"
            />
            {state.errors && state.errors.biodata ? (
              <p className="text-xs text-[#FF4D4F] mt-1 font-medium">
                {state.errors.biodata}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`flex flex-row w-full ${
              isChanged ? "mt-4" : "mt-0"
            } gap-x-2 justify`}
          >
            {isChanged && (
              <button
                className={`px-4 py-2 hover:bg-black hover:text-white bg-green-300 rounded-full transition-all font-semibold border-black border-2 text-white"`}
              >
                Save
              </button>
            )}
            {isChanged && (
              <div
                onClick={(e) => {
                  cancelChanges();
                }}
                className={`px-4 py-2 hover:bg-black hover:text-white bg-red-300 rounded-full transition-all font-semibold border-black border-2 text-white"`}
              >
                Cancel
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
