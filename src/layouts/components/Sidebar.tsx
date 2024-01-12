"use client";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  {
    href: "/forms",
    label: "Home",
  },
  {
    href: "/forms/new",
    label: "New Form",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-primary">
      {links.map(({ href, label }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            "text-white font-semibold p-4 hover:bg-slate-100 hover:text-primary w-full flex transition-all",
            {
              "text-primary bg-slate-100": href === pathname,
            }
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
export { Sidebar };
