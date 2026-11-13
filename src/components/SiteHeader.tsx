import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Coins } from "lucide-react";

const links = [
  { to: "/investimentos", label: "Investimentos" },
  { to: "/cripto", label: "Cripto" },
  { to: "/carteira", label: "Minha Carteira" },
  { to: "/perfil", label: "Descubra seu perfil" },
  { to: "/simulador", label: "Simulador" },
  { to: "/duvidas", label: "Dúvidas & Glossário" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Coins className="h-4 w-4" />
          </span>
          Bússola<span className="text-primary">Invest</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3 text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-8 text-center text-xs text-muted-foreground">
      <p className="mx-auto max-w-2xl px-4">
        Conteúdo educativo. Não é recomendação de investimento. Rentabilidade passada não garante
        rentabilidade futura. Taxas e regras de impostos mudam — confirme sempre em fontes oficiais.
      </p>
    </footer>
  );
}
