import Erros from "@/constants/Erros";
import SenhaHash from "@/shared/SenhaHash";

test('Deve lançar erro com senha com apenas números', () => {
    expect(() => new SenhaHash('1234567890')).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test('Deve lançar erro com senha com apenas letras', () => {
    expect(() => new SenhaHash('AbcDrfeHUoi')).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test('Deve lançar erro com senha com apenas caracteres especiais', () => {
    expect(() => new SenhaHash('$#@()&%$#')).toThrow(Erros.SENHA_HASH_INVALIDA);
});


test('Deve lancar erro com senha com menos de 8 caracteres', () => {
    expect(() => new SenhaHash('$An15')).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test('Deve lancar erro com senha vazia', () => {
    expect(() => new SenhaHash()).toThrow(Erros.SENHA_HASH_INVALIDA);
    expect(() => new SenhaHash('')).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test('Deve criar senha com rash válido', () => {
    const hashs: string[] = [
        '$2y$12$xI0vmi4tC/JlKOK0hmF1B.988P4rYSmZ.oCeDte9G4KEIJwLKTJz2',
        '$2y$12$5dfGcYCMGnxf5zpIeudF6OTbOyKbHQLIihBVSIWFRzsvCngR/YiU2',
        '$2y$12$xvdEaj3.VKRQdf6Mjpd3uOc43fqsUJNOfshiIyW3y2fAN7jt/t.5.',
        '$2y$12$wcDQJew9xWQKy//eHTVS.eHBrjiQQdduPObfRy8LK3.SlNVCYuv6O'
    ]

    hashs.forEach((hash: string) => {
        expect(new SenhaHash(hash)).toBeDefined();
    })
});

