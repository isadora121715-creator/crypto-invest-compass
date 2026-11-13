export function simular(inicial: number, mensal: number, taxaAnual: number, anos: number) {
  const i = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  const pontos: { ano: number; total: number; investido: number }[] = [];
  let total = inicial;
  for (let m = 1; m <= anos * 12; m++) {
    total = total * (1 + i) + mensal;
    if (m % 12 === 0) pontos.push({ ano: m / 12, total, investido: inicial + mensal * m });
  }
  return { total, investido: inicial + mensal * anos * 12, pontos };
}
