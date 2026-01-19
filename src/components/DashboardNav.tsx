"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface DashboardNavProps {
  user: {
    name?: string | null;
    email: string;
  };
}

export default function DashboardNav({ user }: DashboardNavProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-primary">Packpert</span>
            </Link>
            <span className="ml-4 text-sm text-muted">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              View Website
            </Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {user.name || "Admin"}
                </p>
                <p className="text-xs text-muted">{user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
