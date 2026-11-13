import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bitcoin,
  Calculator,
  Compass,
  HelpCircle,
  Landmark,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Bússola Invest — Aprenda a investir e entenda cripto",
      "Guia claro e interativo sobre investimentos e criptomoedas para iniciantes: tipos, riscos, simulador e perfil.",
    ),
  component: Index,
});

const cards = [
  {
    to: "/investimentos",
    icon: Landmark,
    t: "Tipos de investimento",
    d: "Tesouro, CDB, ações, FIIs e mais — compare risco, liquidez e rendimento.",
  },
  {
    to: "/cripto",
    icon: Bitcoin,
    t: "Guia de cripto",
    d: "Bitcoin, Ethereum, stablecoins, como comprar com segurança e evitar golpes.",
  },
  {
    to: "/perfil",
    icon: Compass,
    t: "Descubra seu perfil",
    d: "Responda 4 perguntas e veja onde faz mais sentido você investir.",
  },
  {
    to: "/simulador",
    icon: Calculator,
    t: "Simulador",
    d: "Veja quanto seu dinheiro pode crescer com aportes mensais.",
  },
  {
    to: "/carteira",
    icon: Wallet,
    t: "Minha carteira",
    d: "Registre seus aportes e veja o valor atual, o lucro e o prejuízo calculados na hora.",
  },
  {
    to: "/duvidas",
    icon: HelpCircle,
    t: "Dúvidas & glossário",
    d: "Respostas diretas e todos os termos explicados em português claro.",
  },
] as const;

const regras = [
  ["1", "Reserva primeiro", "6 meses de gastos guardados em algo seguro e com resgate rápido."],
  ["2", "Diversifique", "Nunca coloque tudo em um só lugar — muito menos em uma só cripto."],
  [
    "3",
    "Pense no prazo",
    "Dinheiro de curto prazo vai para renda fixa. Risco é para o longo prazo.",
  ],
  ["4", "Desconfie de milagres", "Ganho garantido e alto não existe. É sinal de golpe."],
];

function Index() {
  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Feito para quem está começando
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
            Investir sem <span className="text-primary">medo</span> e sem complicação.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Entenda como cada investimento funciona, onde colocar seu dinheiro e como dar os
            primeiros passos em cripto com segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/perfil"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              Descobrir meu perfil <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/cripto"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 font-semibold transition hover:bg-secondary"
            >
              Começar por cripto
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Por onde você quer começar?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <c.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Abrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold">As 4 regras de ouro</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {regras.map(([n, t, d]) => (
              <div key={n}>
                <div className="font-display text-5xl font-extrabold text-primary/40">{n}</div>
                <h3 className="mt-2 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
