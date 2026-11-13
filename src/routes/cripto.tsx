import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { criptos, passosCripto, golpes } from "@/lib/content";
import { RiskBadge } from "@/components/RiskBadge";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cripto")({
  head: () => seo("Guia de criptomoedas para iniciantes — Bússola Invest", "Entenda Bitcoin, Ethereum e stablecoins, como comprar com segurança, guardar suas moedas e evitar golpes."),
  component: Page,
});

function Page() {
  const [feitos, setFeitos] = useState<number[]>([]);
  const toggle = (i: number) => setFeitos((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));
  return (
    <>
      <PageHeader kicker="Criptomoedas" title="Cripto, do zero ao seguro" sub="O que são, quais as principais e um passo a passo para investir com responsabilidade." />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[["O que é?", "Dinheiro 100% digital, que não depende de banco ou governo. As transações ficam registradas na blockchain."],
            ["Por que sobe e desce?", "O preço depende só de oferta e procura. Notícias, regulação e o humor do mercado causam grandes oscilações."],
            ["Vale a pena?", "Pode valorizar muito, mas também cair muito. Trate como uma parte pequena da carteira, nunca como tudo."]].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6"><h3 className="text-lg font-semibold text-primary">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>

        <h2 className="mt-16 text-3xl font-bold">As principais</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criptos.map((c) => (
            <div key={c.simbolo} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className={`font-display text-2xl font-extrabold text-${c.cor}`}>{c.simbolo}</span>
                <RiskBadge risk={c.risco} />
              </div>
              <h3 className="mt-2 font-semibold">{c.nome}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.resumo}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Uso principal: <span className="text-foreground">{c.uso}</span></p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">Seu checklist para começar</h2>
          <p className="text-sm text-muted-foreground">{feitos.length} de {passosCripto.length} concluídos</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-primary transition-all" style={{ width: `${(feitos.length / passosCripto.length) * 100}%` }} /></div>
        <ol className="mt-6 space-y-3">
          {passosCripto.map((p, i) => {
            const ok = feitos.includes(i);
            return (
              <li key={p.t}>
                <button onClick={() => toggle(i)} className={`flex w-full gap-4 rounded-2xl border p-5 text-left transition ${ok ? "border-accent/50 bg-accent/10" : "border-border bg-card hover:bg-secondary"}`}>
                  <CheckCircle2 className={`mt-0.5 h-6 w-6 shrink-0 ${ok ? "text-accent" : "text-muted-foreground"}`} />
                  <div><h3 className="font-semibold">{i + 1}. {p.t}</h3><p className="mt-1 text-sm text-muted-foreground">{p.d}</p></div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 rounded-3xl border border-destructive/40 bg-destructive/10 p-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><AlertTriangle className="text-destructive" /> Sinais de golpe</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">{golpes.map((g) => <li key={g} className="text-sm">• {g}</li>)}</ul>
        </div>
      </div>
    </>
  );
}
