import Erros from "@/constants/Erros";
import Capitulo, { CapituloProps } from "@/curso/Capitulo";
import ErroValidacao from "@/error/ErroValidacao";
import Duracao from "@/shared/Duracao";
import Entidade, { EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";

export interface CursoProps extends EntidadeProps {
  nome: string;
  data: Date;
  capitulos: CapituloProps[];
  duracao: number;
  quantidadeDeAulas: number;
}

export default class Curso extends Entidade<Curso, CursoProps> {
  readonly nome: NomeSimples;
  readonly data: Date;
  readonly capitulos: Capitulo[];
  readonly duracao: Duracao;
  readonly quantidadeDeAulas: number;

  constructor(props: CursoProps) {
    super({
      ...props,
      ...Curso.calcularNumerosDoCurso(props),
      data: props.data ?? new Date(),
      capitulos: Curso.ordenarCapitulo(props.capitulos ?? []),
    });

    this.nome = new NomeSimples(this.props.nome!, 3, 50);
    this.data = this.props.data;
    this.capitulos = this.props.capitulos!.map(
      (capitulo) => new Capitulo(capitulo)
    );
    this.duracao = new Duracao(this.props.duracao);
    this.quantidadeDeAulas = this.props.quantidadeDeAulas!;

    const { duracao, quantidadeDeAulas } = this.props;
    if (duracao! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_DURACAO, duracao);
    }

    if (quantidadeDeAulas! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_AULAS, quantidadeDeAulas);
    }
  }

  private static calcularNumerosDoCurso(props: CursoProps) {
    if (!props.capitulos) {
      return {
        duracao: props.duracao ?? 0,
        quatidadeDeAulas: props.quantidadeDeAulas ?? 0,
      };
    }

    const capitulos = props.capitulos.map((capitulo) => new Capitulo(capitulo));
    const ducacao = capitulos.reduce(
      (total, capitulo) => total + capitulo.duracao.segundos,
      0
    );
    const quantidadeDeAulas = capitulos.reduce(
      (total, capitulo) => total + capitulo.quantidadeAulas,
      0
    );

    return { ducacao, quantidadeDeAulas };
  }

  private static ordenarCapitulo(
    capituloProps: CapituloProps[]
  ): CapituloProps[] {
    const capitulos = capituloProps.map((capitulo) => new Capitulo(capitulo));
    const capitulosOrdenados = capitulos.sort(Ordem.ordenar);
    return Curso.reatribuirOrder(capitulosOrdenados).map(
      (capitulo) => capitulo.props
    );
  }

  private static reatribuirOrder(capitulos: Capitulo[]): Capitulo[] {
    return capitulos.map((capitulo, index) =>
      capitulo.clone({ ordem: index + 1 })
    );
  }
}
