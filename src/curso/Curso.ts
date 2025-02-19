import Erros from "@/constants/Erros";
import Capitulo, { CapituloProps } from "@/curso/Capitulo";
import ErroValidacao from "@/error/ErroValidacao";
import Duracao from "@/shared/Duracao";
import Entidade, { EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";
import Aula from "./Aula";

export interface CursoProps extends EntidadeProps {
  nome?: string;
  data?: Date;
  capitulos?: CapituloProps[];
  duracao?: number;
  quantidadeDeAulas?: number;
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
    this.data = this.props.data!;
    this.capitulos = this.props.capitulos!.map(
      (capitulo) => new Capitulo(capitulo)
    );
    this.duracao = new Duracao(this.props.duracao);
    this.quantidadeDeAulas = this.props.quantidadeDeAulas!;

    const { duracao, quantidadeDeAulas } = this.props;
    if (duracao! <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_DURACAO, duracao);
    }

    if (!quantidadeDeAulas || quantidadeDeAulas <= 0) {
      ErroValidacao.lancar(Erros.CURSO_SEM_AULAS, quantidadeDeAulas);
    }
  }

  atualizarAula(selecionada: Aula): Curso {
    const capitulos = this.capitulos.map((capitulo) => {
      const aulas = capitulo.aulas.map((aula) =>
        aula.igual(selecionada) ? selecionada : aula
      );
      return {
        ...capitulo.props,
        aulas: aulas.map((aula) => aula.props),
      } as CapituloProps;
    });
    return this.clone({ capitulos });
  }

  adicionarCapitulo(capitulo: Capitulo, posicao?: number): Curso {
    const atuais = this.capitulos;
    const novosCapitulos =
      posicao !== undefined
        ? [...atuais.slice(0, posicao), capitulo, ...atuais.slice(posicao)]
        : [...atuais, capitulo];
    const capitulos = Curso.reatribuirOrder(novosCapitulos).map(
      (capitulo) => capitulo.props
    );
    return this.clone({ capitulos });
  }

  removerCapitulo(selecionado: Capitulo): Curso {
    const outrosCapitulos = this.capitulos.filter((capitulo) =>
      capitulo.diferente(selecionado)
    );
    const capitulos = Curso.reatribuirOrder(outrosCapitulos).map(
      (capitulo) => capitulo.props
    );
    return this.clone({ capitulos });
  }

  moverCapitulo(selecionada: Capitulo, posicao: number): Curso {
    return this.removerCapitulo(selecionada).adicionarCapitulo(
      selecionada,
      posicao
    );
  }

  moverCapituloParaCima(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((capitulo) =>
      capitulo.igual(selecionado)
    );
    const primeira = posicao === 0;
    return primeira ? this : this.moverCapitulo(selecionado, posicao - 1);
  }

  moverCapituloParaBaixo(selecionado: Capitulo): Curso {
    const posicao = this.capitulos.findIndex((capitulo) =>
      capitulo.igual(selecionado)
    );
    const ultima = posicao === this.capitulos.length - 1;
    return ultima ? this : this.moverCapitulo(selecionado, posicao + 1);
  }

  get aulas(): Aula[] {
    return this.capitulos.flatMap((capitulo) => capitulo.aulas);
  }

  get primeiroCapitulo() {
    return this.capitulos[0];
  }

  get ultimoCapitulo() {
    return this.capitulos[this.capitulos.length - 1];
  }

  private static calcularNumerosDoCurso(props: CursoProps) {
    if (!props.capitulos) {
      return {
        duracao: props.duracao ?? 0,
        quatidadeDeAulas: props.quantidadeDeAulas ?? 0,
      };
    }

    const capitulos = props.capitulos.map((capitulo) => new Capitulo(capitulo));
    const duracao = capitulos.reduce(
      (total, capitulo) => total + capitulo.duracao.segundos,
      0
    );
    const quantidadeDeAulas = capitulos.reduce(
      (total, capitulo) => total + capitulo.quantidadeAulas,
      0
    );

    return { duracao, quantidadeDeAulas };
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
