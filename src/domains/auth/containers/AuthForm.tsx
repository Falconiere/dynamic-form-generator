"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type AuthFormProps = {
  view: "sign_in" | "sign_up" | "forgotten_password";
};

const AuthForm = ({ view }: AuthFormProps) => {
  const supabase = createClientComponentClient();

  return (
    <div className=" grid grid-cols-2 h-full">
      <div className="bg-black" />
      <div className="p-8 flex items-center justify-center bg-slate-50">
        <div className="w-full">
          <Card>
            <CardHeader>
              <h1 className="text-2xl">Welcome</h1>
            </CardHeader>
            <CardContent>
              <Auth
                supabaseClient={supabase}
                view={view}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                showLinks={false}
                providers={[]}
                redirectTo="http://localhost:3000/auth/callback"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { AuthForm };
