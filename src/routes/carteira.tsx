import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Trash2, Wallet } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { seo } from "@/lib/seo";
import {
  type Aporte,
  type PrecoAtualMap,
  type TipoAporte,
  agruparPorAtivo,
  buscarCotacoes,
  calcularResumo,
  carregarAportes,
  moedasCripto,
  novoId,
  salvarAportes,
  valorInvestido,
} from "@/lib/carteira";

export const Route = createFileRoute("/carteira")({
  head: () =>
    seo(
      "Minha Carteira — Bússola Invest",
      "Registre seus aportes em cripto e outros investimentos e acompanhe o valor atual, o lucro e o prejuízo da sua carteira.",
    ),
  component: Page,
});

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
const brlCompacto = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const dataBr = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

const coresComposicao = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-primary",
  "bg-accent",
];

const formVazio = {
  tipo: "cripto" as TipoAporte,
  moedaId: moedasCripto[0].id,
  ativo: "",
  quantidade: "",
  precoUnitario: "",
  data: new Date().toISOString().slice(0, 10),
  local: "",
  valorAtualManual: "",
};

function Page() {
  const [aportes, setAportes] = useState<Aporte[]>([]);
  const [carregado, setCarregado] = useState(false);
  const [precos, setPrecos] = useState<PrecoAtualMap>({});
  const [buscandoPrecos, setBuscandoPrecos] = useState(false);
  const [erroPrecos, setErroPrecos] = useState<string | null>(null);
  const [form, setForm] = useState(formVazio);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formAberto, setFormAberto] = useState(false);

  // Carrega os aportes salvos neste navegador ao abrir a página.
  useEffect(() => {
    setAportes(carregarAportes());
    setCarregado(true);
  }, []);

  // Persiste a cada alteração (depois do carregamento inicial, para não sobrescrever com []).
  useEffect(() => {
    if (carregado) salvarAportes(aportes);
  }, [aportes, carregado]);

  const idsCripto = useMemo(
    () => aportes.filter((a) => a.tipo === "cripto" && a.moedaId).map((a) => a.moedaId as string),
    [aportes],
  );

  async function atualizarCotacoes(ids: string[]) {
    if (ids.length === 0) return;
    setBuscandoPrecos(true);
    setErroPrecos(null);
    try {
      const novos = await buscarCotacoes(ids);
      setPrecos((p) => ({ ...p, ...novos }));
    } catch {
      setErroPrecos(
        "Não foi possível buscar as cotações agora. Os valores abaixo podem estar desatualizados.",
      );
    } finally {
      setBuscandoPrecos(false);
    }
  }

  // Busca as cotações automaticamente quando a lista de criptos muda.
  useEffect(() => {
    if (idsCripto.length > 0) atualizarCotacoes(idsCripto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsCripto.join(",")]);

  const resumosPorAtivo = useMemo(() => agruparPorAtivo(aportes, precos), [aportes, precos]);
  const resumo = useMemo(() => calcularResumo(resumosPorAtivo), [resumosPorAtivo]);

  function resetForm() {
    setForm(formVazio);
    setEditandoId(null);
    setFormAberto(false);
  }

  function editar(a: Aporte) {
    setForm({
      tipo: a.tipo,
      moedaId: a.moedaId ?? moedasCripto[0].id,
      ativo: a.ativo,
      quantidade: String(a.quantidade),
      precoUnitario: String(a.precoUnitario),
      data: a.data,
      local: a.local,
      valorAtualManual: a.valorAtualManual != null ? String(a.valorAtualManual) : "",
    });
    setEditandoId(a.id);
    setFormAberto(true);
  }

  function excluir(id: string) {
    setAportes((lista) => lista.filter((a) => a.id !== id));
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    const quantidade = Number(form.quantidade.replace(",", "."));
    const precoUnitario = Number(form.precoUnitario.replace(",", "."));
    if (
      !quantidade ||
      quantidade <= 0 ||
      !precoUnitario ||
      precoUnitario <= 0 ||
      !form.data ||
      !form.local.trim()
    )
      return;

    const moeda = form.tipo === "cripto" ? moedasCripto.find((m) => m.id === form.moedaId) : null;
    const ativoNome = form.tipo === "cripto" ? (moeda?.simbolo ?? form.moedaId) : form.ativo.trim();
    if (!ativoNome) return;

    const valorManual =
      form.valorAtualManual.trim() === "" ? null : Number(form.valorAtualManual.replace(",", "."));

    const aporte: Aporte = {
      id: editandoId ?? novoId(),
      tipo: form.tipo,
      moedaId: form.tipo === "cripto" ? form.moedaId : null,
      ativo: ativoNome,
      quantidade,
      precoUnitario,
      data: form.data,
      local: form.local.trim(),
      valorAtualManual: form.tipo === "outro" ? valorManual : null,
    };

    setAportes((lista) => {
      if (editandoId) return lista.map((a) => (a.id === editandoId ? aporte : a));
      return [...lista, aporte];
    });
    resetForm();
  }

  return (
    <>
      <PageHeader
        kicker="Minha carteira"
        title="Acompanhe seus investimentos de verdade"
        sub="Registre o que você já investiu — em cripto ou em qualquer outro ativo — e veja o valor atual, o lucro e o prejuízo calculados automaticamente."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="rounded-xl bg-secondary/60 p-4 text-xs text-muted-foreground">
          Seus dados ficam salvos somente neste navegador (não são enviados a nenhum servidor). As
          cotações de cripto são buscadas em tempo real na CoinGecko; para outros ativos, você
          informa o valor atual quando quiser atualizar.
        </p>

        {/* Resumo */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs text-muted-foreground">Total investido</p>
            <p className="mt-1 text-2xl font-bold">{brl(resumo.investidoTotal)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs text-muted-foreground">Valor atual</p>
            <p className="mt-1 text-2xl font-bold">{brl(resumo.valorAtualTotal)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs text-muted-foreground">Resultado</p>
            <p
              className={`mt-1 text-2xl font-bold ${resumo.resultado >= 0 ? "text-accent" : "text-destructive"}`}
            >
              {resumo.resultado >= 0 ? "+" : ""}
              {brl(resumo.resultado)}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs text-muted-foreground">Rentabilidade</p>
            <p
              className={`mt-1 text-2xl font-bold ${resumo.resultadoPercentual >= 0 ? "text-accent" : "text-destructive"}`}
            >
              {resumo.resultadoPercentual >= 0 ? "+" : ""}
              {resumo.resultadoPercentual.toFixed(1)}%
            </p>
          </div>
        </div>

        {erroPrecos && (
          <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            {erroPrecos}
          </p>
        )}
        {resumo.temValorDesconhecido && !erroPrecos && (
          <p className="mt-4 rounded-xl bg-primary/10 p-3 text-sm text-muted-foreground">
            Alguns ativos ainda não têm valor atual — informe um valor manual ao editar o aporte.
          </p>
        )}

        {/* Composição */}
        {resumosPorAtivo.length > 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Composição da carteira</h2>
              <button
                onClick={() => atualizarCotacoes(idsCripto)}
                disabled={buscandoPrecos || idsCripto.length === 0}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${buscandoPrecos ? "animate-spin" : ""}`} />{" "}
                Atualizar cotações
              </button>
            </div>
            <div className="mt-4 flex h-4 overflow-hidden rounded-full">
              {resumosPorAtivo.map((r, i) => {
                const v = r.valorAtual ?? r.investidoTotal;
                const pct = resumo.valorAtualTotal > 0 ? (v / resumo.valorAtualTotal) * 100 : 0;
                return (
                  <div
                    key={r.chave}
                    className={coresComposicao[i % coresComposicao.length]}
                    style={{ width: `${pct}%` }}
                  />
                );
              })}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {resumosPorAtivo.map((r, i) => {
                const v = r.valorAtual ?? r.investidoTotal;
                const pct = resumo.valorAtualTotal > 0 ? (v / resumo.valorAtualTotal) * 100 : 0;
                return (
                  <li key={r.chave} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${coresComposicao[i % coresComposicao.length]}`}
                      />
                      {r.ativo}
                    </span>
                    <span className="font-semibold">{pct.toFixed(1)}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Lista de aportes */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Seus aportes</h2>
          <button
            onClick={() => {
              resetForm();
              setFormAberto(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Novo aporte
          </button>
        </div>

        {formAberto && (
          <form
            onSubmit={salvar}
            className="mt-4 grid gap-4 rounded-2xl border border-primary/40 bg-card p-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <label className="block text-sm">
              <span className="text-muted-foreground">Tipo de ativo</span>
              <select
                value={form.tipo}
                onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value as TipoAporte }))}
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                <option value="cripto">Criptomoeda</option>
                <option value="outro">Outro investimento (renda fixa, ações, FIIs...)</option>
              </select>
            </label>

            {form.tipo === "cripto" ? (
              <label className="block text-sm">
                <span className="text-muted-foreground">Moeda</span>
                <select
                  value={form.moedaId}
                  onChange={(e) => setForm((f) => ({ ...f, moedaId: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  {moedasCripto.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome} ({m.simbolo})
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="block text-sm">
                <span className="text-muted-foreground">Nome do ativo</span>
                <input
                  value={form.ativo}
                  onChange={(e) => setForm((f) => ({ ...f, ativo: e.target.value }))}
                  placeholder="Ex.: Tesouro Selic, PETR4, CDB Banco X"
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  required
                />
              </label>
            )}

            <label className="block text-sm">
              <span className="text-muted-foreground">Quantidade</span>
              <input
                value={form.quantidade}
                onChange={(e) => setForm((f) => ({ ...f, quantidade: e.target.value }))}
                inputMode="decimal"
                placeholder={form.tipo === "cripto" ? "Ex.: 0.015" : "Ex.: 1"}
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="block text-sm">
              <span className="text-muted-foreground">Preço pago por unidade (R$)</span>
              <input
                value={form.precoUnitario}
                onChange={(e) => setForm((f) => ({ ...f, precoUnitario: e.target.value }))}
                inputMode="decimal"
                placeholder="Ex.: 350000"
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="block text-sm">
              <span className="text-muted-foreground">Data do investimento</span>
              <input
                type="date"
                value={form.data}
                onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              />
            </label>

            <label className="block text-sm">
              <span className="text-muted-foreground">Onde foi investido</span>
              <input
                value={form.local}
                onChange={(e) => setForm((f) => ({ ...f, local: e.target.value }))}
                placeholder="Ex.: Binance, Banco X, XP"
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                required
              />
            </label>

            {form.tipo === "outro" && (
              <label className="block text-sm sm:col-span-2 lg:col-span-1">
                <span className="text-muted-foreground">Valor atual (opcional)</span>
                <input
                  value={form.valorAtualManual}
                  onChange={(e) => setForm((f) => ({ ...f, valorAtualManual: e.target.value }))}
                  inputMode="decimal"
                  placeholder="Deixe em branco se não mudou"
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                />
              </label>
            )}

            <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {editandoId ? "Salvar alterações" : "Adicionar aporte"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {aportes.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
            <Wallet className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">
              Você ainda não tem aportes registrados. Adicione o primeiro acima.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Ativo</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Onde</th>
                  <th className="px-4 py-3">Quantidade</th>
                  <th className="px-4 py-3">Investido</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[...aportes]
                  .sort((a, b) => (a.data < b.data ? 1 : -1))
                  .map((a) => (
                    <tr key={a.id} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">{a.ativo}</td>
                      <td className="px-4 py-3 text-muted-foreground">{dataBr(a.data)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{a.local}</td>
                      <td className="px-4 py-3">{a.quantidade}</td>
                      <td className="px-4 py-3">{brl(valorInvestido(a))}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editar(a)}
                            aria-label="Editar"
                            className="rounded-md p-1.5 hover:bg-secondary"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => excluir(a.id)}
                            aria-label="Excluir"
                            className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Resumo por ativo */}
        {resumosPorAtivo.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">Resultado por ativo</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumosPorAtivo.map((r) => {
                const atual = r.valorAtual ?? r.investidoTotal;
                const lucro = atual - r.investidoTotal;
                const pct = r.investidoTotal > 0 ? (lucro / r.investidoTotal) * 100 : 0;
                return (
                  <div key={r.chave} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{r.ativo}</h3>
                      <span className="text-xs text-muted-foreground">
                        {r.numAportes} aporte(s)
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Investido</p>
                    <p className="font-semibold">{brl(r.investidoTotal)}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Valor atual</p>
                    <p className="font-semibold">
                      {r.valorAtual === null ? "— informe o valor atual" : brlCompacto(atual)}
                    </p>
                    {r.valorAtual !== null && (
                      <p
                        className={`mt-2 text-sm font-semibold ${lucro >= 0 ? "text-accent" : "text-destructive"}`}
                      >
                        {lucro >= 0 ? "+" : ""}
                        {brl(lucro)} ({pct >= 0 ? "+" : ""}
                        {pct.toFixed(1)}%)
                      </p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      Último aporte: {dataBr(r.ultimoAporte)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground">
          Conteúdo educativo para acompanhamento pessoal. Cotações de cripto podem ter pequenas
          variações em relação à sua corretora. Isto não é recomendação de investimento.
        </p>
      </div>
    </>
  );
}
