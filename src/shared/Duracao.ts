import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";

export default class Duracao {
    static readonly UM_MINUTO: number = 60;
    static readonly UMA_HORA: number = 3600;
    readonly segundos: number;

    constructor(segundos?: number) {
        if (segundos && segundos < 0) {
            ErroValidacao.lancar(Erros.DURACAO_NEGATIVA);
        }
        this.segundos = segundos ?? 0;
    }

    somar(duracao: Duracao): Duracao {
        return new Duracao(this.segundos + duracao.segundos);
    }

    igual(duracao: Duracao): boolean {
        return this.segundos === duracao.segundos;
    }

    get zerada(): boolean {
        return this.segundos === 0;
    }

    diferente(duracao: Duracao): boolean {
        return this.segundos !== duracao.segundos;
    }

    get hm() {
        const { horas, minutos } = this.partes;
        const hora = horas.toString().padStart(2, '0');
        const minuto = minutos.toString().padStart(2, '0');
        if (horas) {
            return `${hora}h ${minuto}m`;
        }
        return `${minuto}m`;
    }

    get hms() {
        const { horas, minutos, segundos } = this.partes;
        const hora = horas.toString().padStart(2, '0');
        const minuto = minutos.toString().padStart(2, '0');
        const segundo = segundos.toString().padStart(2, '0');
        if (horas) {
            return `${hora}h ${minuto}m ${segundo}s`;
        }
        if (minutos) {
            return `${minuto}m ${segundo}s`;
        }
        return `${segundo}s`;
    }

    get partes() {
        return {
            horas: Math.floor(this.segundos / Duracao.UMA_HORA),
            minutos: Math.floor((this.segundos % Duracao.UMA_HORA) / Duracao.UM_MINUTO),
            segundos: this.segundos % Duracao.UM_MINUTO
        }
    }
}