import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";

export default class SenhaForte {
    static readonly RGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    constructor(readonly valor?: string) {
        if (!SenhaForte.isValida(valor ?? '')) {
            ErroValidacao.lancar(Erros.SENHA_FRACA);
        }
    }

    static isValida(senha: string): boolean {
        return this.RGEX.test(senha);
    }
}