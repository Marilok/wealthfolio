export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      {children}
    </section>
  );
}
