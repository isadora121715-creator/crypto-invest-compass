import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq, glossario } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/duvidas")({
  head: () => seo("Dúvidas e glossário de investimentos — Bússola Invest", "Respostas para as dúvidas mais comuns e todos os termos de investimento e cripto explicados."),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const s = q.toLowerCase();
  const fq = faq.filter(([a, b]) => (a + b).toLowerCase().includes(s));
  const gl = glossario.filter(([a, b]) => (a + b).toLowerCase().includes(s));
  return (
    <>
      <PageHeader kicker="Dúvidas" title="Pergunte, a gente explica" sub="Busque qualquer palavra — 'imposto', 'seed', 'CDI' — e encontre a resposta." />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Digite sua dúvida..." className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-lg outline-none focus:border-primary" />
        </div>
        <h2 className="mt-10 text-2xl font-bold">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-4 rounded-2xl border border-border bg-card px-5">
          {fq.map(([a, b]) => (
            <AccordionItem key={a} value={a}><AccordionTrigger className="text-left text-base">{a}</AccordionTrigger><AccordionContent className="text-muted-foreground">{b}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
        {fq.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Nenhuma pergunta encontrada.</p>}
        <h2 className="mt-12 text-2xl font-bold">Glossário</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {gl.map(([a, b]) => <div key={a} className="rounded-xl border border-border bg-card p-4"><h3 className="font-semibold text-primary">{a}</h3><p className="mt-1 text-sm text-muted-foreground">{b}</p></div>)}
        </div>
      </div>
    </>
  );
}
