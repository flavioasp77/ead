import Erros from "@/constants/Erros";
import Ordem from "@/shared/Ordem"

test('Deve criar ordem como 1', () => {
    const ordem = new Ordem();
    expect(ordem.valor).toBe(1);
});

test('Deve criar ordem com valor 1000', () => {
    const ordem = new Ordem(1000);
    expect(ordem.valor).toBe(1000);
});

test('Deve lançar erro com ordem zerada', () => {
    expect(() => new Ordem(0)).toThrow(Erros.ORDEM_INVALIDA);
});

test('Deve lançar erro com ordem negativa', () => {
    expect(() => new Ordem(-1)).toThrow(Erros.ORDEM_INVALIDA);
});

test('Deve comparar duas ordem para ordenação', () => {
    const ordem1 = new Ordem(1);
    const ordem2a = new Ordem(2);
    const ordem2b = new Ordem(2);

    expect(ordem1.comparar(ordem2a)).toBe(-1);
    expect(ordem2a.comparar(ordem1)).toBe(1)
    expect(ordem2a.comparar(ordem2b)).toBe(0);
});

test('Deve comparar duas ordem como iguals', () => {
    const ordem2a = new Ordem(2);
    const ordem2b = new Ordem(2);

    expect(ordem2a.igual(ordem2b)).toBe(true);
    expect(ordem2a.diferente(ordem2b)).toBe(false);
});


test('Deve comparar duas ordem como diferentes', () => {
    const ordem2a = new Ordem(1);
    const ordem2b = new Ordem(2);

    expect(ordem2a.igual(ordem2b)).toBe(false);
    expect(ordem2a.diferente(ordem2b)).toBe(true);
});

test('Deve ordenar corretamente', () => {
    const items = [
        {ordem: new Ordem(3)},
        {ordem: new Ordem(1)},
        {ordem: new Ordem(2)}        
    ];

    items.sort(Ordem.ordenar);
    expect(items[0].ordem.valor).toBe(1);
    expect(items[1].ordem.valor).toBe(2);
    expect(items[2].ordem.valor).toBe(3);
});

