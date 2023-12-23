"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

type FormTabsProps = {
  links: { href: string; label: string; isActive?: boolean }[];
  className?: string;
  classNameLink?: HTMLAttributes<HTMLDivElement>["className"];
};

const linkStyles =
  "tab flex flex-1 text-center items-center justify-center bg-white font-semibold p-4 rounded-md cursor-pointer shadow-md hover:bg-gray-200 hover:text-black";
const FormTabs = ({ links, className, classNameLink }: FormTabsProps) => {
  const pathname = usePathname();
  const isUrlActive = (path: string, isActive?: boolean) => {
    return {
      "bg-blue-400 text-white": isActive || pathname === path,
    };
  };
  return (
    <div
      className={cn(
        `tabs flex text-center justify-between gap-2 sticky top-0 bg-slate-100 pb-4`,
        className
      )}
    >
      {links.map(({ href, label, isActive }) => (
        <Link
          key={href}
          className={cn(linkStyles, classNameLink, isUrlActive(href, isActive))}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export { FormTabs };
