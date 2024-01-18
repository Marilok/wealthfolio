"use client";

import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Database } from "@/types/supabase";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { createBrowserClient } from "@supabase/ssr";

export default function Page() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const onGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
  };
  return (
    <>
      <Card className="m-auto p-unit-md max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader className="w-full ">
          <h1 className={"font-bold text-2xl text-center w-full"}>
            Welcome to {siteConfig.name}
          </h1>
        </CardHeader>
        <CardBody>
          <Button
            startContent={<GithubIcon />}
            className="bg-black text-white"
            onClick={async () => {
              await onGithubLogin();
            }}
          >
            Access with GitHub
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
