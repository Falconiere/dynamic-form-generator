"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { APP_DOMAIN } from "@/constants/constants";

type AuthFormProps = {
  view: "sign_in" | "sign_up" | "forgotten_password";
};

const AuthForm = ({ view }: AuthFormProps) => {
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log({ session, APP_DOMAIN });
      if (session) {
        window.location.reload();
      }
    });
  }, [supabase.auth.onAuthStateChange]);
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-md p-4 shadow-md rounded-md">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          redirectTo={`${APP_DOMAIN}/auth/callback`}
        />
      </div>
    </div>
  );
};

export { AuthForm };
