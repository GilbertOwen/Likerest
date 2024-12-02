"use server";
import { z } from "zod";
import axios from "axios";

const registerValidation = z.object({
  username: z.string().min(6, "Username must be atleast 6 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export default async function registerUser(prevState: any, formData: FormData) {
  try {
    const userData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      registerValidation.parse(userData);
    } catch (zodError: any) {
      let errors: any = {};
      zodError.errors.map((error: any) => {
        errors[error.path.join(".")] = error.message;
      });
      return {
        status: "failed",
        message: "Validation failed",
        errors,
      };
    }
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/users`,
      userData
    );
    if (result.status == 200) {
      return {
        status: "success",
        message: result.data.message,
      };
    } else {
      return {
        status: "failed",
        message: result.data.message,
        errors: result.data.errors,
      };
    }
  } catch (err: any) {
    return {
      status: "failed",
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
}
