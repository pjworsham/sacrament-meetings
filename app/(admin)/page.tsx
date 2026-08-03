// dashboard/page.tsx
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      <p>Welcome, {session.user.name}!</p>

      <p>You are successfully logged in.</p>

      <form
        action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
        }}
        >
        <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-white"
        >
            Sign Out
        </button>
    </form>

      
    </main>
  );
}