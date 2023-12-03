import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Auth } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    defaultValues: {},
  });

  const router = useRouter();
  const supabase = createClientComponentClient<Auth>();

  const onSignUp = async ({ email, password }: Auth) => {
    console.log({ email, password });
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const onSignIn = async ({ email, password }: Auth) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Card className="w-full">
      <CardContent className="grid gap-2 p-8">
        <h1 className="text-2xl">Welcome</h1>
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "Please enter an email",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
          error={errors.email?.message}
        />
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "Please enter a password",
            },
            minLength: 6,
          })}
          type="password"
          error={errors.password?.message}
        />
        <div className="grid gap-2">
          <Button onClick={handleSubmit(onSignUp)} type="button">
            Sign up
          </Button>
          <Button onClick={handleSubmit(onSignIn)} type="button">
            Sign in
          </Button>
          <Button onClick={onSignOut} type="button">
            Sign out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
