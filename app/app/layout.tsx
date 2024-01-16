import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const userMail = (await supabase.auth.getSession()).data.session?.user.email;

  if (!userMail) {
    redirect("/login");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      {children}
    </section>
  );
}
