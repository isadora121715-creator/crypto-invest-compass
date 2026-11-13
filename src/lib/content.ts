export type Risk = "Baixo" | "Médio" | "Alto" | "Muito alto";

export const investimentos = [
  { nome: "Tesouro Selic", tipo: "Renda fixa", risco: "Baixo" as Risk, liquidez: "D+1", minimo: "~R$ 150", rende: "Taxa Selic", ideal: "Reserva de emergência",
    como: "Você empresta dinheiro ao governo federal. É o investimento mais seguro do Brasil, garantido pelo Tesouro Nacional.",
    pros: ["Altíssima segurança", "Resgate a qualquer dia", "Rende mais que a poupança"], contras: ["Cobra IR regressivo", "Rendimento menor que ações no longo prazo"] },
  { nome: "Tesouro IPCA+", tipo: "Renda fixa", risco: "Baixo" as Risk, liquidez: "D+1 (com oscilação)", minimo: "~R$ 50", rende: "Inflação + taxa fixa", ideal: "Aposentadoria e metas longas",
    como: "Protege seu dinheiro da inflação e ainda paga um ganho real. Se vender antes do vencimento, o preço pode estar acima ou abaixo.",
    pros: ["Protege da inflação", "Ótimo para longo prazo"], contras: ["Oscila se resgatar antes", "IR sobre o lucro"] },
  { nome: "CDB", tipo: "Renda fixa", risco: "Baixo" as Risk, liquidez: "Diária ou no vencimento", minimo: "A partir de R$ 1", rende: "% do CDI", ideal: "Reserva e metas curtas",
    como: "Você empresta dinheiro a um banco. Protegido pelo FGC até R$ 250 mil por CPF por instituição.",
    pros: ["Garantia do FGC", "Fácil de entender", "Muitos com liquidez diária"], contras: ["IR regressivo", "Bancos menores = mais risco"] },
  { nome: "LCI / LCA", tipo: "Renda fixa", risco: "Baixo" as Risk, liquidez: "Geralmente com carência", minimo: "R$ 100 a R$ 1.000", rende: "% do CDI", ideal: "Metas de médio prazo",
    como: "Títulos ligados aos setores imobiliário e agrícola. Isentos de Imposto de Renda para pessoa física e cobertos pelo FGC.",
    pros: ["Isento de IR", "Garantia do FGC"], contras: ["Prazo mínimo de carência"] },
  { nome: "Fundos Imobiliários (FIIs)", tipo: "Renda variável", risco: "Médio" as Risk, liquidez: "D+2 (na bolsa)", minimo: "~R$ 10 por cota", rende: "Aluguéis mensais + valorização", ideal: "Renda passiva mensal",
    como: "Você vira 'sócio' de shoppings, galpões, escritórios ou títulos imobiliários e recebe aluguéis todo mês, isentos de IR.",
    pros: ["Renda mensal isenta", "Diversificação imobiliária barata"], contras: ["Preço das cotas oscila", "Vacância reduz rendimentos"] },
  { nome: "Ações", tipo: "Renda variável", risco: "Alto" as Risk, liquidez: "D+2", minimo: "Preço de 1 ação", rende: "Valorização + dividendos", ideal: "Longo prazo (5+ anos)",
    como: "Você compra um pedaço de uma empresa. Ganha quando ela cresce e quando distribui lucros (dividendos).",
    pros: ["Maior potencial no longo prazo", "Dividendos"], contras: ["Alta volatilidade", "Exige estudo"] },
  { nome: "ETFs", tipo: "Renda variável", risco: "Médio" as Risk, liquidez: "D+2", minimo: "~R$ 10", rende: "Segue um índice", ideal: "Quem quer diversificar fácil",
    como: "Um 'pacote' de ativos negociado na bolsa. Ex.: BOVA11 segue o Ibovespa, IVVB11 segue o S&P 500, HASH11 segue cripto.",
    pros: ["Diversificação instantânea", "Taxas baixas"], contras: ["Sem isenção de IR até R$ 20 mil"] },
  { nome: "Criptomoedas", tipo: "Cripto", risco: "Muito alto" as Risk, liquidez: "24h por dia, 7 dias", minimo: "A partir de R$ 1", rende: "Valorização (sem garantia)", ideal: "Pequena parte da carteira (1–10%)",
    como: "Ativos digitais descentralizados registrados em blockchain. Sem garantia do governo ou FGC. Podem subir ou cair 50%+ em meses.",
    pros: ["Potencial alto de valorização", "Mercado aberto 24/7", "Acessível"], contras: ["Volatilidade extrema", "Golpes frequentes", "Sem proteção do FGC"] },
];

export const criptos = [
  { simbolo: "BTC", nome: "Bitcoin", cor: "text-chart-1", resumo: "A primeira e maior cripto. Oferta limitada a 21 milhões de unidades — por isso é chamada de 'ouro digital'.", uso: "Reserva de valor", risco: "Alto" as Risk },
  { simbolo: "ETH", nome: "Ethereum", cor: "text-chart-3", resumo: "Plataforma para contratos inteligentes, DeFi e NFTs. O ETH paga as 'taxas' (gas) da rede.", uso: "Aplicações descentralizadas", risco: "Alto" as Risk },
  { simbolo: "USDT/USDC", nome: "Stablecoins", cor: "text-chart-2", resumo: "Moedas pareadas ao dólar (1 = US$ 1). Úteis para 'estacionar' dinheiro sem sair do mundo cripto.", uso: "Dolarização e pagamentos", risco: "Médio" as Risk },
  { simbolo: "SOL", nome: "Solana", cor: "text-chart-5", resumo: "Blockchain rápida e barata, popular para apps e memecoins. Já teve quedas de rede no passado.", uso: "Apps rápidos", risco: "Muito alto" as Risk },
  { simbolo: "Altcoins", nome: "Outras moedas", cor: "text-chart-4", resumo: "Milhares de projetos menores. A maioria tende a perder valor ou desaparecer. Memecoins são pura especulação.", uso: "Especulação", risco: "Muito alto" as Risk },
];

export const passosCripto = [
  { t: "Monte sua reserva de emergência antes", d: "Tenha 6 meses de gastos em algo seguro (Tesouro Selic ou CDB com liquidez diária). Só depois invista em cripto." },
  { t: "Escolha uma corretora confiável", d: "Prefira exchanges grandes, com CNPJ ou operação regulada no Brasil, e ative a verificação em duas etapas (2FA)." },
  { t: "Comece pelo Bitcoin e Ethereum", d: "São as mais consolidadas. Evite moedas que 'prometem 1000%' em grupos de WhatsApp ou Telegram." },
  { t: "Compre aos poucos (DCA)", d: "Invista um valor fixo todo mês, independente do preço. Isso reduz o risco de comprar tudo no topo." },
  { t: "Guarde com segurança", d: "Para valores altos, use uma carteira própria (hardware wallet). Nunca compartilhe sua seed phrase (as 12/24 palavras)." },
  { t: "Declare no Imposto de Renda", d: "Criptos devem ser declaradas. Ganhos acima do limite de isenção pagam imposto. Guarde o histórico de compras." },
];

export const golpes = [
  "Promessa de rendimento garantido ou 'renda fixa em cripto' muito alta",
  "Pessoas pedindo sua seed phrase ou senha (ninguém legítimo pede)",
  "Pirâmides: você ganha por indicar outras pessoas",
  "Perfis falsos de famosos 'dobrando' seu Bitcoin",
  "Sites copiados de corretoras — sempre confira o endereço",
];

export const glossario = [
  ["Blockchain", "Um livro-caixa público e digital, copiado em milhares de computadores, onde todas as transações ficam registradas."],
  ["Exchange / Corretora", "Empresa onde você compra e vende criptomoedas com reais."],
  ["Carteira (wallet)", "Onde suas criptos ficam guardadas. Pode ser na corretora ou uma carteira própria."],
  ["Seed phrase", "12 ou 24 palavras que dão acesso total à sua carteira. Quem tem essas palavras tem seu dinheiro."],
  ["Volatilidade", "O quanto o preço sobe e desce. Cripto é extremamente volátil."],
  ["DCA", "Dollar Cost Averaging: comprar um valor fixo periodicamente para suavizar o preço médio."],
  ["Halving", "Evento a cada ~4 anos em que a emissão de novos Bitcoins cai pela metade."],
  ["Stablecoin", "Cripto atrelada a uma moeda tradicional, como o dólar."],
  ["CDI", "Taxa de referência da renda fixa, quase igual à Selic. '100% do CDI' é o padrão de comparação."],
  ["Selic", "Taxa básica de juros do Brasil, definida pelo Banco Central."],
  ["Liquidez", "Rapidez com que você transforma o investimento em dinheiro na conta."],
  ["FGC", "Fundo Garantidor de Créditos: devolve até R$ 250 mil se um banco quebrar. Não cobre cripto nem ações."],
  ["Dividendos", "Parte do lucro que empresas distribuem aos acionistas."],
  ["Diversificação", "Espalhar o dinheiro em vários tipos de investimento para reduzir riscos."],
  ["Perfil de investidor", "Conservador, moderado ou arrojado — define quanto risco você aceita."],
];

export const faq = [
  ["Quanto devo colocar em cripto?", "A maioria dos especialistas sugere entre 1% e 10% do patrimônio investido, dependendo do seu perfil. Só invista o que aceitaria ver cair pela metade."],
  ["Onde é melhor investir?", "Depende do objetivo e do prazo. Reserva de emergência: Tesouro Selic ou CDB com liquidez diária. Metas de 2 a 5 anos: CDB, LCI/LCA, Tesouro IPCA+. Longo prazo: uma mistura de renda fixa, ações/ETFs, FIIs e uma pequena parte em cripto. Use o 'Descubra seu perfil' para uma sugestão."],
  ["É melhor deixar a cripto na corretora ou em carteira própria?", "Valores pequenos na corretora são práticos. Valores grandes ficam mais seguros numa carteira própria (hardware wallet) — mas aí a responsabilidade de guardar a seed phrase é toda sua."],
  ["Meu Bitcoin caiu 20%. Vendo?", "Quedas de 20–30% são comuns em cripto. Vender no pânico costuma realizar o prejuízo. Pense no seu prazo: se é longo, quedas fazem parte. Nunca use dinheiro que vai precisar em breve."],
  ["Preciso pagar imposto sobre cripto?", "Sim. Cripto deve ser declarada no IR e lucros acima do limite de isenção são tributados. As regras mudam com frequência — confira sempre a Receita Federal ou um contador."],
  ["Poupança vale a pena?", "Hoje, quase sempre não. Tesouro Selic e CDBs de 100% do CDI costumam render mais, com segurança semelhante."],
  ["O que é 'comprar na baixa'?", "Tentar acertar o fundo do preço é muito difícil, até para profissionais. Comprar todo mês (DCA) é mais simples e eficaz para iniciantes."],
];

export const perguntasPerfil = [
  { q: "Se seu investimento caísse 30% em um mês, você...", o: [["Venderia tudo na hora", 0], ["Ficaria nervoso, mas esperaria", 1], ["Compraria mais", 2]] },
  { q: "Quando vai precisar desse dinheiro?", o: [["Em menos de 1 ano", 0], ["Entre 1 e 5 anos", 1], ["Daqui a mais de 5 anos", 2]] },
  { q: "Você já tem reserva de emergência?", o: [["Não", 0], ["Tenho uma parte", 1], ["Sim, completa", 2]] },
  { q: "Quanto você conhece de investimentos?", o: [["Quase nada", 0], ["O básico", 1], ["Bastante", 2]] },
] as const;

export const carteiras = {
  Conservador: { desc: "Prioriza segurança. Ideal para quem está começando ou precisa do dinheiro logo.", aloc: [["Renda fixa (Tesouro, CDB, LCI)", 85], ["FIIs", 10], ["Cripto (BTC)", 5]] },
  Moderado: { desc: "Equilibra segurança e crescimento. Aceita algumas oscilações por um retorno melhor.", aloc: [["Renda fixa", 60], ["Ações e ETFs", 20], ["FIIs", 12], ["Cripto (BTC/ETH)", 8]] },
  Arrojado: { desc: "Busca crescimento no longo prazo e tolera grandes quedas no caminho.", aloc: [["Renda fixa", 35], ["Ações e ETFs (Brasil e exterior)", 40], ["FIIs", 12], ["Cripto (BTC/ETH)", 13]] },
} as const;
