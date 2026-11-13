// Lógica da funcionalidade "Minha Carteira": cadastro de aportes, persistência
// local (localStorage) e cálculo de valores (investido, atual, lucro/prejuízo).

export type TipoAporte = "cripto" | "outro";

export interface MoedaCripto {
  id: string; // id usado na API da CoinGecko
  simbolo: string;
  nome: string;
}

// Lista curada das criptomoedas mais comuns para o seletor do formulário.
export const moedasCripto: MoedaCripto[] = [
  { id: "bitcoin", simbolo: "BTC", nome: "Bitcoin" },
  { id: "ethereum", simbolo: "ETH", nome: "Ethereum" },
  { id: "tether", simbolo: "USDT", nome: "Tether (USDT)" },
  { id: "usd-coin", simbolo: "USDC", nome: "USD Coin (USDC)" },
  { id: "solana", simbolo: "SOL", nome: "Solana" },
  { id: "binancecoin", simbolo: "BNB", nome: "BNB" },
  { id: "ripple", simbolo: "XRP", nome: "XRP" },
  { id: "cardano", simbolo: "ADA", nome: "Cardano" },
  { id: "dogecoin", simbolo: "DOGE", nome: "Dogecoin" },
  { id: "polkadot", simbolo: "DOT", nome: "Polkadot" },
  { id: "litecoin", simbolo: "LTC", nome: "Litecoin" },
  { id: "chainlink", simbolo: "LINK", nome: "Chainlink" },
  { id: "matic-network", simbolo: "MATIC", nome: "Polygon" },
  { id: "avalanche-2", simbolo: "AVAX", nome: "Avalanche" },
  { id: "tron", simbolo: "TRX", nome: "TRON" },
];

export interface Aporte {
  id: string;
  tipo: TipoAporte;
  // Para cripto: id da CoinGecko (ex.: "bitcoin"). Para outro: null.
  moedaId: string | null;
  // Nome de exibição (símbolo da cripto, ou o nome digitado para outros ativos).
  ativo: string;
  quantidade: number;
  precoUnitario: number; // preço pago por unidade, em R$
  data: string; // ISO yyyy-mm-dd
  local: string; // corretora / exchange / banco
  // Para ativos que não são cripto, o valor atual é informado manualmente
  // (não há cotação automática disponível).
  valorAtualManual: number | null;
  notas?: string;
}

const STORAGE_KEY = "bussola-invest:carteira:v1";

export function carregarAportes(): Aporte[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function salvarAportes(aportes: Aporte[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(aportes));
  } catch {
    // localStorage indisponível (modo privado, por exemplo) — ignora silenciosamente.
  }
}

export function novoId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function valorInvestido(a: Aporte) {
  return a.quantidade * a.precoUnitario;
}

export interface PrecoAtualMap {
  [moedaId: string]: number; // preço atual em BRL
}

// Busca as cotações atuais (em BRL) na API pública da CoinGecko para a lista
// de moedas informadas. Lança erro em caso de falha de rede — quem chamar
// deve tratar e manter os últimos preços conhecidos.
export async function buscarCotacoes(moedaIds: string[]): Promise<PrecoAtualMap> {
  const ids = Array.from(new Set(moedaIds)).filter(Boolean);
  if (ids.length === 0) return {};
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids.join(","))}&vs_currencies=brl`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao buscar cotações (${res.status})`);
  const data: Record<string, { brl?: number }> = await res.json();
  const map: PrecoAtualMap = {};
  for (const id of ids) {
    const v = data[id]?.brl;
    if (typeof v === "number") map[id] = v;
  }
  return map;
}

export interface ResumoAtivo {
  chave: string; // moedaId para cripto, ou nome do ativo para outros
  tipo: TipoAporte;
  ativo: string;
  quantidadeTotal: number;
  investidoTotal: number;
  precoMedio: number;
  valorAtual: number | null; // null quando não há cotação nem valor manual
  ultimoAporte: string;
  numAportes: number;
}

export function agruparPorAtivo(aportes: Aporte[], precos: PrecoAtualMap): ResumoAtivo[] {
  const grupos = new Map<string, Aporte[]>();
  for (const a of aportes) {
    const chave =
      a.tipo === "cripto" ? `cripto:${a.moedaId}` : `outro:${a.ativo.trim().toLowerCase()}`;
    const lista = grupos.get(chave) ?? [];
    lista.push(a);
    grupos.set(chave, lista);
  }

  const resumos: ResumoAtivo[] = [];
  for (const [chave, lista] of grupos) {
    const tipo = lista[0].tipo;
    const quantidadeTotal = lista.reduce((s, a) => s + a.quantidade, 0);
    const investidoTotal = lista.reduce((s, a) => s + valorInvestido(a), 0);
    const precoMedio = quantidadeTotal > 0 ? investidoTotal / quantidadeTotal : 0;
    const ultimoAporte = lista.reduce((max, a) => (a.data > max ? a.data : max), lista[0].data);

    let valorAtual: number | null = null;
    if (tipo === "cripto") {
      const moedaId = lista[0].moedaId;
      const preco = moedaId ? precos[moedaId] : undefined;
      valorAtual = typeof preco === "number" ? preco * quantidadeTotal : null;
    } else {
      // Para ativos manuais, soma o valor atual informado em cada aporte;
      // quando não informado, assume o valor investido daquele aporte (sem variação conhecida).
      valorAtual = lista.reduce((s, a) => s + (a.valorAtualManual ?? valorInvestido(a)), 0);
    }

    resumos.push({
      chave,
      tipo,
      ativo: lista[0].ativo,
      quantidadeTotal,
      investidoTotal,
      precoMedio,
      valorAtual,
      ultimoAporte,
      numAportes: lista.length,
    });
  }

  return resumos.sort((a, b) => b.investidoTotal - a.investidoTotal);
}

export interface ResumoCarteira {
  investidoTotal: number;
  valorAtualTotal: number;
  resultado: number;
  resultadoPercentual: number;
  temValorDesconhecido: boolean;
}

export function calcularResumo(resumos: ResumoAtivo[]): ResumoCarteira {
  const investidoTotal = resumos.reduce((s, r) => s + r.investidoTotal, 0);
  const temValorDesconhecido = resumos.some((r) => r.valorAtual === null);
  const valorAtualTotal = resumos.reduce((s, r) => s + (r.valorAtual ?? r.investidoTotal), 0);
  const resultado = valorAtualTotal - investidoTotal;
  const resultadoPercentual = investidoTotal > 0 ? (resultado / investidoTotal) * 100 : 0;
  return { investidoTotal, valorAtualTotal, resultado, resultadoPercentual, temValorDesconhecido };
}
