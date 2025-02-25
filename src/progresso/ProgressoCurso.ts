import Erros from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";
import ProgressoAula, { ProgressoAulaProps } from "@/progresso/ProgressoAula";
import Duracao from "@/shared/Duracao";
import Email from "@/shared/Email";
import Entidade, { EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";

export interface ProgressoCursoProps extends EntidadeProps {
  emailUsuario?: string;
  nomeCurso?: string;
  data?: Date;
  dataConclusao?: Date;
  aulas?: ProgressoAulaProps[];
  aulaSelecionadaId?: string;
}

export default class ProgressoCurso extends Entidade<
  ProgressoCurso,
  ProgressoCursoProps
> {
  readonly emailUsuario: Email;
  readonly nomeCurso: NomeSimples;
  readonly data: Date;
  readonly dataConclusao?: Date;
  readonly aulaSelecionada: ProgressoAula;
  readonly aulas: ProgressoAula[];

  constructor(props: ProgressoCursoProps) {
    super(props);
    if (!props.aulas?.length) {
      ErroValidacao.lancar(Erros.PROGRESSO_CUSRO_SEM_AULAS);
    }

    this.emailUsuario = new Email(props.emailUsuario!);
    this.nomeCurso = new NomeSimples(props.nomeCurso!, 3, 50);
    this.data = props.data ?? new Date();
    this.aulas = props.aulas.map((props) => new ProgressoAula(props));
    this.aulaSelecionada =
      this.aulas.find((aula) => aula.id.valor === props.aulaSelecionadaId) ??
      this.aulas[0];
  }

  iniciarAula(aulaId: string): ProgressoCurso {
    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.iniciar().props : aula.props
    );
    return this.clone({ aulas, data: new Date() });
  }

  concluirAula(aulaId: string): ProgressoCurso {
    if (this.concluido) {
      return this;
    }

    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.concluir().props : aula.props
    );
    return this.clone({ aulas, data: new Date() });
  }

  zerarAula(aulaId: string): ProgressoCurso {
    const aulas = this.aulas.map((aula) =>
      aula.id.valor === aulaId ? aula.zerar().props : aula.props
    );
    return this.clone({ aulas, data: new Date() });
  }

  alternarAula(aulaId: string): ProgressoCurso {
    const aula = this.progressoAula(aulaId);
    if (!aula) {
      return this;
    }
    return aula.concluido
      ? this.zerarAula(aula.id.valor)
      : this.concluirAula(aula.id.valor);
  }

  iniciarAulaAtual(): ProgressoCurso {
    return this.iniciarAula(this.aulaSelecionada.id.valor);
  }

  concluirAulaAtual(): ProgressoCurso {
    return this.concluirAula(this.aulaSelecionada.id.valor);
  }

  selecionarAula(aulaId: string): ProgressoCurso {
    return this.clone({
      aulaSelecionadaId: aulaId,
      data: new Date(),
    });
  }

  selecionarProximaAula(): ProgressoCurso {
    const aulaAtual = this.aulas.indexOf(this.aulaSelecionada);
    const proximaAula = this.aulas[aulaAtual + 1];
    return proximaAula ? this.selecionarAula(proximaAula.id.valor) : this;
  }

  concluirESelecionarProximaAula(): ProgressoCurso {
    return this.concluirAulaAtual().selecionarProximaAula();
  }

  progressoAula(aulaId: string): ProgressoAula | undefined {
    return this.aulas.find((aula) => aula.id.valor === aulaId);
  }

  get concluido() {
    return this.aulas.every((progressoAula) => progressoAula.concluido);
  }

  get duracaoTotal(): Duracao {
    return this.aulas.reduce(
      (total, aula) => total.somar(aula.duracao),
      new Duracao()
    );
  }

  get duracaoAssistida(): Duracao {
    return this.aulas
      .filter((progressoAula) => progressoAula.concluido)
      .reduce((total, aula) => total.somar(aula.duracao), new Duracao());
  }

  get percentualAssistido(): number {
    const fator = this.duracaoAssistida.segundos / this.duracaoTotal.segundos;
    return Math.floor(fator * 100);
  }
}
