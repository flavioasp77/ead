import Erros from "@/constants/Erros";
import NomePessoa from "@/shared/NomePessoa";

test('Deve lançar erro ao tenta criar nove vazio', () => {
    expect(() => new NomePessoa('')).toThrow(Erros.NOME_VAZIO);
    expect(() => new NomePessoa()).toThrow(Erros.NOME_VAZIO);
});

test('Deve lançar vários erros ao tentar criar nome vazio', () => {
    try {
        new NomePessoa();
    } catch (erros: any) {
        expect(erros[0].codigo).toBe(Erros.NOME_VAZIO);
        expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO);
        expect(erros[1].extras.min).toBe(4);
        expect(erros[2].codigo).toBe(Erros.NOME_SEM_SOBRENOME);
    }
})

test('Deve lançar erro ao tenta criar nome com menos de 4 caracteres', () => {
    expect(() => new NomePessoa('Li z')).toThrow(Erros.NOME_PEQUENO);
});

test('Deve lançar erro ao tenta criar nome com mais de 120 caracteres', () => {
    const nomeGigante = "Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo";
    expect(() => new NomePessoa(nomeGigante)).toThrow(Erros.NOME_GRANDE);
});

test('Deve lancar erro ao tentar criar nome sem sobrenome',  () => {
    expect(() => new NomePessoa('Pedro')).toThrow(Erros.NOME_SEM_SOBRENOME);
});

test('Deve lançar erro ao tentar criar nome com caractetes especiais', () => {
    expect(() => new NomePessoa('Pedro @Pedro')).toThrow(Erros.NOME_CARACTERES_INVALIDOS);
});

test('Deve criar nome com e dois sobrenomes', () => {
    const nome = new NomePessoa('João Silva Pereita');

    expect(nome.completo).toBe('João Silva Pereita');
    expect(nome.primeiroNome).toBe('João');
    expect(nome.sobrenomes).toEqual(['Silva', 'Pereita']);
    expect(nome.ultimoSobrenome).toBe('Pereita');
});

test('deve criar nome com apóstrofo', () => {
    const nomeComApostrofo = "João D'Ávila";
    const nome = new NomePessoa(nomeComApostrofo);
    expect(nome.completo).toBe(nomeComApostrofo);
});