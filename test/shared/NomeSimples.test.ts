import Erros from "@/constants/Erros";
import NomeSimples from "@/shared/NomeSimples"

test('Deve retornar o nome simples', () => {
    const nome = new NomeSimples('Arquitetura Limpa', 3, 30);
    expect(nome.completo).toBe('Arquitetura Limpa');
});

test('Deve usar o Pascal Case no nome', () => {
    const nome = new NomeSimples('arquitetura limpa', 3, 50);
    expect(nome.pascalCase).toBe('Arquitetura Limpa');
});

test('Deve lancar erro com nome vazio', () => {
    expect(() => new NomeSimples(undefined as any, 3, 50)).toThrow(Erros.NOME_VAZIO);
    expect(() => new NomeSimples('', 3, 50)).toThrow(Erros.NOME_VAZIO);
});

test('Deve lançar erro com nome muito pequeno', () => {
    expect(() => new NomeSimples('Arq', 4, 50)).toThrow(Erros.NOME_PEQUENO);
});

test('Deve lancar erro com nome muito grande', () => {
    expect(() => new NomeSimples('Arquitetura Limpa e Hexagonal', 4, 25)).toThrow(Erros.NOME_GRANDE);
});