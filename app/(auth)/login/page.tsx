"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { loginAction } from "@/lib/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await loginAction(formData);

    if (result.success && result.data) {
      localStorage.setItem("token", result.data.token);
      router.push("/dashboard");
    } else if (result.error) {
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

        <div className="flex flex-col justify-center flex-1 max-w-xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-white mb-4">
            Login to your account
          </h1>

          <p className="text-gray-400 mb-8">
            Don't have an account yet?{" "}
            <Link href="/signup" className="text-[#5CE5E2] hover:underline">
              Register
            </Link>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                {errors.root.message}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter username or email"
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
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Your password here"
                className={`w-full px-4 py-3 bg-[#1F1F21] border rounded-lg text-white placeholder:text-[#888888] focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#4C4C4C] focus:border-[#5CE5E2] focus:ring-[#5CE5E2]"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
              <Link
                href="#"
                className="block text-right text-gray-400 hover:text-[#5CE5E2] underline mt-4"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-[200px] cursor-pointer bg-[#5CE5E2] text-[#323232] font-semibold py-3 rounded-lg hover:bg-[#4dd4d1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-[50%] relative overflow-hidden">
        <Image
          src="/assets/auth/Login.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
