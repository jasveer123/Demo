"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import * as Select from "@radix-ui/react-select";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import { signupAction } from "@/lib/actions/auth";

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const genderValue = watch("gender");

  const onSubmit = async (data: SignupFormData) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.gender) {
      formData.append("gender", data.gender);
    }

    const result = await signupAction(formData);

    if (result.success) {
      // Store user data for potential auto-login or redirect to login
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      router.push("/login");
    } else {
      setError("root", { message: result.error });
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-[50%] bg-[#141316] px-12 py-8">
        <div className="mb-12">
          <Image
            src="/assets/logo/Logo.svg"
            alt="Bfonik Logo"
            width={109}
            height={28}
            className="h-7 w-auto"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 max-w-2xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-4">
            Create a new account
          </h1>

          <p className="text-gray-400 mb-8">
            Already a member?{" "}
            <Link href="/login" className="text-[#5CE5E2] hover:underline">
              Login
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {errors.root.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First name here"
                  className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last name here"
                  className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-white mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  placeholder="your username here"
                  className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                    errors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                  }`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="gender" className="block text-white mb-2">
                  Gender
                </label>
                <Select.Root
                  value={genderValue || ""}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <Select.Trigger
                    id="gender"
                    className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white focus:outline-none focus:ring-1 flex items-center justify-between cursor-pointer ${
                      errors.gender
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                    }`}
                  >
                    <Select.Value placeholder="Select" />
                    <Select.Icon className="text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      position="popper"
                      className="bg-[#1F1F21] border border-[#4C4C4C] rounded-lg overflow-hidden shadow-lg z-50 min-w-[var(--radix-select-trigger-width)]"
                    >
                      <Select.ScrollUpButton className="hidden" />
                      <Select.Viewport className="p-1">
                        <Select.Item
                          value="male"
                          className="px-4 py-3 text-white cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:outline-none rounded"
                        >
                          <Select.ItemText>Male</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value="female"
                          className="px-4 py-3 text-white cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:outline-none rounded"
                        >
                          <Select.ItemText>Female</Select.ItemText>
                        </Select.Item>
                        <Select.Item
                          value="other"
                          className="px-4 py-3 text-white cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:outline-none rounded"
                        >
                          <Select.ItemText>Other</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                      <Select.ScrollDownButton className="hidden" />
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-400">{errors.gender.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="your email here"
                className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Create password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Create your password"
                className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-[200px] cursor-pointer bg-[#5CE5E2] text-[#323232] font-semibold py-3 rounded-lg hover:bg-[#4dd4d1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-[50%] relative overflow-hidden">
        <Image
          src="/assets/auth/Login.jpg"
          alt="Signup background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
