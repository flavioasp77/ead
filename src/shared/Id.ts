import Erros from '@/constants/Erros';
import ErroValidacao from '@/error/ErroValidacao';
import { v4 as uuid, validate } from 'uuid';


export default class Id {
    readonly valor: string;
    readonly novo: boolean;

    constructor(valor?: string) {
        this.valor = valor ?? uuid();
        this.novo = !valor;

        if (!validate(this.valor)) {
            ErroValidacao.lancar(Erros.ID_INVALIDO, this.valor);
        }
    }

    static get novo() {
        return new Id();
    }

    igual(id: Id): boolean {
        return this.valor === id?.valor
    }

    difente(id: Id): boolean {
        return this.valor !== id?.valor
    }
}