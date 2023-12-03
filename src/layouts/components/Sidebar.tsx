import Link from "next/link";

const links = [{ href: "/forms/new", label: "New Form" }];

const Sidebar = () => (
  <nav className="bg-black w-full">
    {links.map(({ href, label }) => (
      <Link
        href={href}
        key={href}
        className="text-white p-4 hover:bg-slate-400 w-full flex transition-all"
      >
        {label}
      </Link>
    ))}
  </nav>
);
export { Sidebar };
