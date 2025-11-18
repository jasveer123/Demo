"use server";

import { signup as signupAPI, login as loginAPI } from "@/lib/api";

export async function signupAction(formData: FormData) {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    gender: formData.get("gender") as string,
  };

  try {
    const response = await signupAPI(data);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Signup failed" };
  }
}

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const response = await loginAPI(data);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
}

