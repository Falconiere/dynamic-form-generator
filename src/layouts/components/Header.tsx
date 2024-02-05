"use client";
import Link from "next/link";

import { AccountMenu } from "./AccountMenu";

import React from "react";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type HeaderProps = {
  action?: React.ReactNode;
};
const Header = ({ action }: HeaderProps) => {
  const { t } = useLocaleCtx();
  return (
    <header className="bg-white p-2 grid items-center">
      <div className="w-full max-w-7xl mx-auto grid px-8  items-center">
        <div className="flex gap-4 items-center w-full">
          <AccountMenu />
          <nav className="flex gap-4 items-center">
            <Link
              href="/forms"
              className="text-black font-semibold hover:text-gray-700"
            >
              {t("myForms")}
            </Link>
          </nav>
          {action}
        </div>
      </div>
    </header>
  );
};
export { Header };
