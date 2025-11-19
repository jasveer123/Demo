"use server";

type AuthActionResult = 
  | { success: true; data: { message: string; token: string; user: any } }
  | { success: false; error: string };

export async function signupAction(formData: FormData): Promise<AuthActionResult> {
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    gender: formData.get("gender") as string,
  };

  // Static response - no backend API call
  const mockResponse = {
    message: "Signup successful",
    token: "mock-token-" + Date.now(),
    user: {
      id: "mock-id-" + Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      gender: data.gender,
    },
  };

  return { success: true, data: mockResponse };
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Static response - no backend API call
  const mockResponse = {
    message: "Login successful",
    token: "mock-token-" + Date.now(),
    user: {
      id: "mock-id-" + Date.now(),
      firstName: "John",
      lastName: "Doe",
      username: data.email.split("@")[0],
      email: data.email,
    },
  };

  return { success: true, data: mockResponse };
}

