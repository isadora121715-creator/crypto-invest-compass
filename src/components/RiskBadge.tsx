import type { Risk } from "@/lib/content";
const map: Record<Risk, string> = {
  Baixo: "bg-accent/15 text-accent border-accent/30",
  Médio: "bg-primary/15 text-primary border-primary/30",
  Alto: "bg-chart-4/15 text-chart-4 border-chart-4/30",
  "Muito alto": "bg-destructive/15 text-destructive border-destructive/30",
};
export function RiskBadge({ risk }: { risk: Risk }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[risk]}`}>Risco {risk.toLowerCase()}</span>;
}
