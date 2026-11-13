import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { investimentos } from "@/lib/content";
import { RiskBadge } from "@/components/RiskBadge";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/investimentos")({
  head: () => seo("Tipos de investimento explicados — Bússola Invest", "Tesouro Direto, CDB, LCI, FIIs, ações, ETFs e cripto: como funcionam, riscos, liquidez e para quem servem."),
  component: Page,
});

const filtros = ["Todos", "Renda fixa", "Renda variável", "Cripto"];

function Page() {
  const [f, setF] = useState("Todos");
  const [aberto, setAberto] = useState<string | null>(investimentos[0]?.nome ?? null);
  const lista = investimentos.filter((i) => f === "Todos" || i.tipo === f);
  return (
    <>
      <PageHeader kicker="Investimentos" title="Como funciona cada investimento" sub="Toque em um investimento para ver como ele funciona, vantagens, desvantagens e para quem é indicado." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {filtros.map((x) => (
            <button key={x} onClick={() => setF(x)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${f === x ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>{x}</button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {lista.map((i) => {
            const open = aberto === i.nome;
            return (
              <div key={i.nome} className={`rounded-2xl border bg-card transition ${open ? "border-primary/50" : "border-border"}`}>
                <button onClick={() => setAberto(open ? null : i.nome)} className="flex w-full flex-wrap items-center gap-3 p-5 text-left">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.tipo}</p>
                    <h3 className="text-xl font-semibold">{i.nome}</h3>
                  </div>
                  <RiskBadge risk={i.risco} />
                  <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="border-t border-border p-5 animate-rise">
                    <p className="text-foreground/90">{i.como}</p>
                    <dl className="mt-5 grid gap-3 sm:grid-cols-4">
                      {[["Rende", i.rende], ["Resgate", i.liquidez], ["Mínimo", i.minimo], ["Ideal para", i.ideal]].map(([k, v]) => (
                        <div key={k} className="rounded-xl bg-secondary p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>
                      ))}
                    </dl>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <ul className="space-y-2">{i.pros.map((p) => <li key={p} className="flex gap-2 text-sm"><Check className="h-4 w-4 shrink-0 text-accent" />{p}</li>)}</ul>
                      <ul className="space-y-2">{i.contras.map((p) => <li key={p} className="flex gap-2 text-sm"><X className="h-4 w-4 shrink-0 text-destructive" />{p}</li>)}</ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 className="mt-16 text-2xl font-bold">Comparativo rápido</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-secondary text-left"><tr>{["Investimento", "Risco", "Resgate", "Ideal para"].map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody>{investimentos.map((i) => <tr key={i.nome} className="border-t border-border"><td className="p-3 font-medium">{i.nome}</td><td className="p-3"><RiskBadge risk={i.risco} /></td><td className="p-3 text-muted-foreground">{i.liquidez}</td><td className="p-3 text-muted-foreground">{i.ideal}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
