import { describe, it, expect } from "vitest";
import { simular } from "./simulador";
describe("simulador", () => {
  it("sem juros, total = investido", () => { expect(simular(1000, 100, 0, 1).total).toBeCloseTo(2200); });
  it("10% ao ano sobre 1000 por 1 ano = 1100", () => { expect(simular(1000, 0, 10, 1).total).toBeCloseTo(1100); });
});
