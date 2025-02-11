import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";

export default class Email {
    static readonly REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    readonly valor: string;

    constructor(valor?: string) {
        this.valor = valor?.trim() ?? '';

        if (!Email.isValido(this.valor)) {
            ErroValidacao.lancar(Erros.EMAIL_INVALIDO);
        }
    }

    get usuario(): string {
        return this.valor.split('@')[0];
    }


    get dominio(): string {
        return this.valor.split('@')[1];
    }

    static isValido(email: string): boolean {
        return Email.REGEX.test(email);
    }
}