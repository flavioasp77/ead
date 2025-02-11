import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";

export default class Ordem {
    constructor(readonly valor: number = 1) {
        if (valor <= 0) {
            ErroValidacao.lancar(Erros.ORDEM_INVALIDA);
        }
    }

    igual(outraOrdem: Ordem): boolean {
        return this.valor === outraOrdem.valor; 
    }

    diferente(outraOrdem: Ordem): boolean {
        return this.valor !== outraOrdem.valor;
    }

    comparar(outraOrdem: Ordem): number {
        if (this.igual(outraOrdem)) {
            return 0;
        }

        return this.valor > outraOrdem.valor ? 1 : -1;
    }

    static ordenar(a: { ordem: Ordem }, b: { ordem: Ordem }) {
        return a.ordem.comparar(b.ordem);
    }
}
