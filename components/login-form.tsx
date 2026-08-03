"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { authenticate, createUser } from "@/lib/actions";export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [registerMessage, registerAction] =
    useActionState(createUser, undefined);

  const [errorMessage, formAction, isPending] =
    useActionState(authenticate, undefined);
  

  return (
    <>
      {/* ---------------- Create Account ---------------- */}

      <div className="mb-10 rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          Create Account
        </h2>

        <form action={registerAction} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />

          <div className="relative">
            <input
              name="password"
              type={showRegisterPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowRegisterPassword(!showRegisterPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showRegisterPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
          >
            Create Account
          </button>

          {registerMessage && (
            <p className="text-green-600">
              {registerMessage}
            </p>
          )}
        </form>
      </div>

      <hr className="my-8" />

      {/* ---------------- Sign In ---------------- */}

      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-gray-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={6}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-12 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>

        {errorMessage && (
          <p className="text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </>
  );
}