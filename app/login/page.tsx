"use client";

import { title } from "@/components/primitives";
import { Database } from "@/types/supabase";
import { Button } from "@nextui-org/react";
import { createBrowserClient } from "@supabase/ssr";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Page() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const onGithubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
      },
    });
  };
  return (
    <>
      <h1 className={title()}>Login</h1>
      <Button
        startContent={<IconBrandGithub />}
        color="default"
        onClick={async () => {
          await onGithubLogin();
        }}
      >
        Login with GitHub
      </Button>
    </>
  );
}
