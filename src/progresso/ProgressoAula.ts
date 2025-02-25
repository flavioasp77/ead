import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";
import Duracao from "@/shared/Duracao";
import Entidade, { EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";

export interface ProgressoAulaProps extends EntidadeProps {
  nomeAula?: string;
  duracao?: number;
  dataInicio?: Date;
  dataConclusao?: Date;
}

export default class ProgressoAula extends Entidade<
  ProgressoAula,
  ProgressoAulaProps
> {
  readonly nomeAula: NomeSimples;
  readonly duracao: Duracao;
  readonly dataInicio?: Date;
  readonly dataConlusao?: Date;

  constructor(props: ProgressoAulaProps) {
    super(props);
    this.nomeAula = new NomeSimples(props.nomeAula!, 3, 50);
    this.duracao = new Duracao(props.duracao!);
    this.dataInicio = props.dataInicio;
    this.dataConlusao = props.dataConclusao;

    if (!props.id) {
      ErroValidacao.lancar(Erros.ID_INVALIDO, props.id);
    }

    if (this.duracao.zerada) {
      ErroValidacao.lancar(Erros.DURACAO_ZERADA);
    }
  }

  get iniciado(): boolean {
    return this.dataInicio !== undefined;
  }

  get concluido(): boolean {
    return this.dataConlusao !== undefined;
  }

  iniciar(): ProgressoAula {
    return this.clone({ dataInicio: new Date() });
  }

  concluir(): ProgressoAula {
    return this.clone({ dataConclusao: new Date() });
  }

  zerar(): ProgressoAula {
    return this.clone({ dataConclusao: undefined });
  }
}
