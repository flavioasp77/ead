import Erros from "@/constants/Erros";
import Email from "@/shared/Email"

test('Deve criar um emal válido', () => {
    const email = new Email('fulano@zmail.com');
    expect(email.valor).toBe('fulano@zmail.com');
});

test('Deve retornar no usuario do email', () => {
    const email = new Email('fulano@zmail.com');
    expect(email.usuario).toBe('fulano');
});

test('Deve retornar o dominio do email', () => {
    const email = new Email('fulano@zmail.com');
    expect(email.dominio).toBe('zmail.com');
});

test('Deve retornar erro com email inválido', () => {
    expect(() => new Email('fulano@')).toThrow(Erros.EMAIL_INVALIDO);
    expect(() => new Email()).toThrow(Erros.EMAIL_INVALIDO);       
});