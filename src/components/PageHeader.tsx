export function PageHeader({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <section className="bg-hero border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 animate-rise">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{kicker}</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}
