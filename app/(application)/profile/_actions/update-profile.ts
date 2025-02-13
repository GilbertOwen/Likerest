"use server";

import { cookies } from "next/headers";

export default async function updateProfile(
  prevState: any,
  formData: FormData
) {
  try {
    const cookie = await cookies();
    const auth = cookie.get("auth")?.value;
    if (!auth) {
      return {
        message: "Not Authenticated",
        status: "Error",
      };
    }
    const userData = {
      username: formData.get("username") || "",
      frontName: formData.get("frontName") || "",
      rearName: formData.get("rearName") || "",
      biodata: formData.get("biodata") || "",
      imageUrl: formData.get("imageUrl") || "",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/current`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth, // Assuming you handle authentication
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(JSON.stringify(errorData));
    }

    return {
      message: "Profile updated successfully!",
      status: "success",
      errors: {},
    };
  } catch (error: any) {
    console.error("Caught Error:", error);

    let errors: any = {};
    let errorMessage = "An error occurred while updating the profile.";

    if (typeof error.message === "string") {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;

        if (parsedError.errors && Array.isArray(parsedError.errors)) {
          parsedError.errors.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              errors[err.path[0]] = err.message;
            }
          });
        }
      } catch (e) {
        console.error("Failed to parse error message:", e);
      }
    }

    return {
      message: errorMessage,
      status: "error",
      errors: errors, // Pastikan ini selalu berupa object, tidak undefined
    };
  }
}
