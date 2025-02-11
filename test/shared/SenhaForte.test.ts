import Erros from "@/constants/Erros";
import SenhaForte from "@/shared/SenhaForte";

test('Deve lançar erro com senha com apenas números', () => {
    expect(() => new SenhaForte('1234567890')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha com apenas letras', () => {
    expect(() => new SenhaForte('AbcDrfeHUoi')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lançar erro com senha com apenas caracteres especiais', () => {
    expect(() => new SenhaForte('$#@()&%$#')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lancar erro com senha com menos de 8 caracteres', () => {
    expect(() => new SenhaForte('$An15')).toThrow(Erros.SENHA_FRACA);
});

test('Deve lancar erro com senha vazia', () => {
    expect(() => new SenhaForte()).toThrow(Erros.SENHA_FRACA);
    expect(() => new SenhaForte('')).toThrow(Erros.SENHA_FRACA);
});

test('Deve criar senha forte', () => {
    const senha = 'An@159753';
    expect(new SenhaForte(senha).valor).toBe(senha);
});