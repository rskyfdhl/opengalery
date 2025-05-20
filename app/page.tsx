import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Hero />
      </div>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
      </main>
    </>
  );
}
