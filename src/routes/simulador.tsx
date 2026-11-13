import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { simular } from "@/lib/simulador";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/simulador")({
  head: () => seo("Simulador de investimentos — Bússola Invest", "Simule quanto seu dinheiro pode crescer com juros compostos e aportes mensais."),
  component: Page,
});

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const presets = [["Poupança", 6.2], ["Tesouro Selic / CDB", 10.5], ["Ações (média histórica)", 12], ["Cenário otimista cripto", 25]] as const;

function Slider({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; fmt: (n: number) => string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{fmt(value)}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} className="mt-2 w-full accent-primary" />
    </label>
  );
}

function Page() {
  const [inicial, setInicial] = useState(1000);
  const [mensal, setMensal] = useState(300);
  const [taxa, setTaxa] = useState(10.5);
  const [anos, setAnos] = useState(10);
  const r = simular(inicial, mensal, taxa, anos);
  const max = Math.max(...r.pontos.map((p) => p.total), 1);
  return (
    <>
      <PageHeader kicker="Simulador" title="Quanto meu dinheiro pode virar?" sub="Arraste os controles e veja o poder dos juros compostos ao longo do tempo." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6 rounded-3xl border border-border bg-card p-6">
          <Slider label="Valor inicial" value={inicial} set={setInicial} min={0} max={50000} step={500} fmt={brl} />
          <Slider label="Aporte mensal" value={mensal} set={setMensal} min={0} max={5000} step={50} fmt={brl} />
          <Slider label="Rendimento ao ano" value={taxa} set={setTaxa} min={1} max={40} step={0.5} fmt={(n) => `${n}%`} />
          <Slider label="Tempo" value={anos} set={setAnos} min={1} max={30} step={1} fmt={(n) => `${n} anos`} />
          <div className="flex flex-wrap gap-2">{presets.map(([n, v]) => <button key={n} onClick={() => setTaxa(v)} className={`rounded-full border px-3 py-1 text-xs ${taxa === v ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{n}</button>)}</div>
          <p className="text-xs text-muted-foreground">Valores aproximados, antes de impostos e taxas. Cripto não tem rendimento garantido — pode inclusive dar prejuízo.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div><p className="text-xs text-muted-foreground">Você investiu</p><p className="text-2xl font-bold">{brl(r.investido)}</p></div>
            <div><p className="text-xs text-muted-foreground">Juros ganhos</p><p className="text-2xl font-bold text-accent">{brl(r.total - r.investido)}</p></div>
            <div><p className="text-xs text-muted-foreground">Total final</p><p className="text-3xl font-extrabold text-primary">{brl(r.total)}</p></div>
          </div>
          <div className="mt-8 flex h-72 items-end gap-1">
            {r.pontos.map((p) => (
              <div key={p.ano} className="group relative flex flex-1 flex-col justify-end" style={{ height: "100%" }} title={`Ano ${p.ano}: ${brl(p.total)}`}>
                <div className="rounded-t bg-primary transition-all" style={{ height: `${((p.total - p.investido) / max) * 100}%` }} />
                <div className="bg-secondary transition-all" style={{ height: `${(p.investido / max) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Ano 1</span><span>Ano {anos}</span></div>
          <div className="mt-4 flex gap-4 text-xs"><span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-secondary" /> Dinheiro investido</span><span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-primary" /> Juros</span></div>
        </div>
      </div>
    </>
  );
}
