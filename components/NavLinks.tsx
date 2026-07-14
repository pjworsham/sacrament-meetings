"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/components/MeetingCard.tsx", label: "Meeting Detail" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive
                    ? "text-white hover:text-black"
                    : "text-white hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
