"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#141316]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141316]">
      <nav className="bg-[#1F1F21] border-b border-[#4C4C4C] px-12 py-4">
        <div className="flex items-center justify-between">
          <Image
            src="/assets/logo/Logo.svg"
            alt="Bfonik Logo"
            width={109}
            height={28}
            className="h-7 w-auto"
          />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#5CE5E2] text-[#323232] font-semibold rounded-lg hover:bg-[#4dd4d1] transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-12 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to the dashboard
          </h1>
          {user && (
            <p className="text-gray-400 text-xl">
              Hello, {user.firstName} {user.lastName}!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

