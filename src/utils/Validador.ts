import ErroValidacao from "@/error/ErroValidacao";

export default class Validador {

    static combinar (...erros: (ErroValidacao | null)[]): ErroValidacao[] | null {
        const errosFiltrados = erros.filter((erro) => erro !== null) as ErroValidacao[];
        return errosFiltrados.length > 0 ? errosFiltrados : null;
    }
    
    static naoNulo(valor: any, erro: string): ErroValidacao | null {
        return valor !== null && valor !== undefined ? null : ErroValidacao.novo(erro, valor);
    }

    static naoVazio(valor: string | null | undefined, erro: string): ErroValidacao | null {
        if (Validador.naoNulo(valor, erro)) {
            return ErroValidacao.novo(erro, valor);
        }

        return valor!.trim() !== '' ? null : ErroValidacao.novo(erro, valor);
    }

    static tamanhoMenorQue(valor: string | any[], tamanhoMaximo: number, erro: string): ErroValidacao | null {
        return valor.length < tamanhoMaximo ? null : ErroValidacao.novo(erro, valor, { max: tamanhoMaximo });
    }


    static tamanhoMenorQueOuIgual(valor: string | any[], tamanhoMaximo: number, erro: string): ErroValidacao | null {
        return valor.length <= tamanhoMaximo ? null : ErroValidacao.novo(erro, valor, { max: tamanhoMaximo });
    }

    static tamanhoMaiorQue(valor: string | any[], tamanhoMinimo: number, erro: string): ErroValidacao | null {
        return valor.length > tamanhoMinimo ? null : ErroValidacao.novo(erro, valor, { min: tamanhoMinimo });
    }

    static tamanhoMaiorQueOuIgual(valor: string | any[], tamanhoMinimo: number, erro: string): ErroValidacao | null {
        return valor.length >= tamanhoMinimo ? null : ErroValidacao.novo(erro, valor, { min: tamanhoMinimo });
    }

    static regex(valor: string, regex: RegExp, erro: string): ErroValidacao | null {
        return regex.test(valor) ? null : ErroValidacao.novo(erro, valor);
    }
}