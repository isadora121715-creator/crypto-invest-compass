import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { perguntasPerfil, carteiras } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/perfil")({
  head: () => seo("Descubra seu perfil de investidor — Bússola Invest", "Responda 4 perguntas rápidas e veja uma sugestão de onde investir conforme seu perfil."),
  component: Page,
});

export function perfilPorPontos(p: number): keyof typeof carteiras {
  return p <= 3 ? "Conservador" : p <= 5 ? "Moderado" : "Arrojado";
}
const cores = ["bg-chart-2", "bg-chart-1", "bg-chart-3", "bg-chart-4"];

function Page() {
  const [resp, setResp] = useState<number[]>([]);
  const fim = resp.length === perguntasPerfil.length;
  const perfil = perfilPorPontos(resp.reduce((a, b) => a + b, 0));
  const atual = perguntasPerfil[resp.length];
  const semReserva = resp[2] === 0;
  return (
    <>
      <PageHeader kicker="Perfil" title="Onde é melhor eu investir?" sub="Responda com sinceridade. Não existe resposta certa — existe a que combina com você." />
      <div className="mx-auto max-w-3xl px-4 py-12">
        {!fim && atual ? (
          <div key={resp.length} className="rounded-3xl border border-border bg-card p-8 animate-rise">
            <p className="text-sm text-muted-foreground">Pergunta {resp.length + 1} de {perguntasPerfil.length}</p>
            <div className="mt-2 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(resp.length / perguntasPerfil.length) * 100}%` }} /></div>
            <h2 className="mt-6 text-2xl font-bold">{atual.q}</h2>
            <div className="mt-6 space-y-3">
              {atual.o.map(([t, v]) => (
                <button key={t} onClick={() => setResp([...resp, v as number])} className="w-full rounded-xl border border-border bg-secondary p-4 text-left font-medium transition hover:border-primary hover:bg-primary/10">{t}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/40 bg-card p-8 shadow-glow animate-rise">
            <p className="text-sm uppercase tracking-widest text-primary">Seu perfil</p>
            <h2 className="mt-1 text-4xl font-extrabold">{perfil}</h2>
            <p className="mt-3 text-muted-foreground">{carteiras[perfil].desc}</p>
            {semReserva && <p className="mt-4 rounded-xl bg-destructive/15 p-4 text-sm"><strong>Antes de tudo:</strong> monte sua reserva de emergência em Tesouro Selic ou CDB com liquidez diária. Só depois invista em cripto ou ações.</p>}
            <h3 className="mt-8 font-semibold">Exemplo de divisão da carteira</h3>
            <div className="mt-3 flex h-4 overflow-hidden rounded-full">{carteiras[perfil].aloc.map(([n, v], i) => <div key={n} className={cores[i]} style={{ width: `${v}%` }} />)}</div>
            <ul className="mt-4 space-y-2">
              {carteiras[perfil].aloc.map(([n, v], i) => <li key={n} className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${cores[i]}`} />{n}</span><span className="font-semibold">{v}%</span></li>)}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">Sugestão educativa, não é recomendação personalizada.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setResp([])} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"><RotateCcw className="h-4 w-4" /> Refazer</button>
              <Link to="/simulador" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Simular meus ganhos</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
