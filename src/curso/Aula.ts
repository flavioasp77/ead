import Erros from '@/constants/Erros';
import ErroValidacao from '@/error/ErroValidacao';
import Duracao from '@/shared/Duracao';
import Entidade, { EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from '@/shared/Ordem';
import Url from '@/shared/Url';

export interface AulaProps extends EntidadeProps {
    nome?: string;
    duração?: number;
    videoUrl?: string;
    ordem?: number;
}

export default class Aula extends Entidade<Aula, AulaProps> {
    readonly nome: NomeSimples;
    readonly duracao: Duracao;
    readonly videoUrl: Url;
    readonly ordem: Ordem;

    constructor(props: AulaProps) {
        super({...props, ordem: props.ordem ?? 1});
        this.nome = new NomeSimples(this.props.nome!, 3, 50);
        this.duracao = new Duracao(this.props.duração);
        this.videoUrl = new Url(this.props.videoUrl);
        this.ordem = new Ordem(this.props.ordem);

        if (this.duracao.zerada) {
            ErroValidacao.lancar(Erros.AULA_DURACAO_ZERADA);
        }
    }
}