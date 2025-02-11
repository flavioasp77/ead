import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";

export default class Url {
    readonly valor: string;
    private url: URL;

    constructor(valor?: string) {
        this.valor = valor ?? '';

        if (!Url.isValida(this.valor)) {
            ErroValidacao.lancar(Erros.URL_INVALIDA);
        }

        this.url = new URL(this.valor);

    }

    static isValida(valor: string): boolean {
        try {
            new URL(valor);
            return true;
        } catch {
            return false;
        }
    }

    get protocolo(): string {
        return this.url.protocol;
    }

    get dominio(): string {
        return this.url.hostname;
    }

    get caminho(): string {
        return this.url.pathname
    }

    get parametros(): any {
        const params = this.url.searchParams.toString().split('&');
        return params.reduce((paramsObj, param) => {
            const [chave, valor] = param.split('=');
            return {...paramsObj, [chave]: valor}
        }, {} as any);
    }
}