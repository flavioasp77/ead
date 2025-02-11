import Entidade, { EntidadeProps } from "@/shared/Entidade";
import Aula, { AulaProps } from "./Aula";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";
import ErroValidacao from "@/error/ErroValidacao";
import Erros from "@/constants/Erros";
import Duracao from "@/shared/Duracao";

export interface CapituloProps extends EntidadeProps {
  nome?: string;
  ordem?: number;
  aulas?: AulaProps[];
}

export default class Capitulo extends Entidade<Capitulo, CapituloProps> {
  readonly nome: NomeSimples;
  readonly ordem: Ordem;
  readonly aulas: Aula[];

  constructor(props: CapituloProps) {
    super({
      ...props,
      aulas: Capitulo.ordenarAulas(props.aulas ?? []),
    });
    this.nome = new NomeSimples(props.nome!, 3, 500);
    this.ordem = new Ordem(props.ordem);
    if (!this.props.aulas!.length) {
      ErroValidacao.lancar(Erros.CAPITULO_SEM_AULAS);
    }
    this.aulas = this.props.aulas!.map((aula) => new Aula(aula));
  }

  adicionarAula(aula: Aula, posicao?: number): Capitulo {
    const novasAulas =
      posicao !== undefined
        ? [...this.aulas.slice(0, posicao), aula, ...this.aulas.slice(posicao)]
        : [...this.aulas, aula];
    const aulas = Capitulo.reatribuirOrder(novasAulas).map(
      (aula) => aula.props
    );
    return this.clone({ aulas });
  }

  removerAula(selecionada: Aula): Capitulo {
    const outrasAulas = this.aulas.filter((aula) =>
      aula.diferente(selecionada)
    );
    const aulas = Capitulo.reatribuirOrder(outrasAulas).map(
      (aula) => aula.props
    );
    return this.clone({ aulas });
  }

  moverAula(selecionada: Aula, posicao: number): Capitulo {
    return this.removerAula(selecionada).adicionarAula(selecionada, posicao);
  }

  moverAulaParaCima(selecionada: Aula): Capitulo {
    const posicao = this.aulas.findIndex((aula) => aula.igual(selecionada));
    const primeira = posicao === 0;
    return primeira ? this : this.moverAula(selecionada, posicao - 1);
  }

  moverAulaParaBaixo(selecionada: Aula): Capitulo {
    const posicao = this.aulas.findIndex((aula) => aula.igual(selecionada));
    const ultima = posicao === this.aulas.length - 1;
    return ultima ? this : this.moverAula(selecionada, posicao + 1);
  }

  private static ordenarAulas(aulaProps: AulaProps[]): AulaProps[] {
    const aulas = aulaProps.map((aula) => new Aula(aula));
    const aulasOrdendas = aulas.sort(Ordem.ordenar);
    return Capitulo.reatribuirOrder(aulasOrdendas).map((aula) => aula.props);
  }

  private static reatribuirOrder(aulas: Aula[]): Aula[] {
    return aulas.map((aula, index) => aula.clone({ ordem: index + 1 }));
  }

  get duracao(): Duracao {
    return this.aulas.reduce((total: Duracao, aula: Aula) => {
      return total.somar(aula.duracao);
    }, new Duracao(0));
  }

  get quantidadeAulas(): number {
    return this.aulas.length;
  }

  get primeiraAula() {
    return this.aulas[0];
  }

  get ultimaAula() {
    return this.aulas[this.quantidadeAulas - 1];
  }
}
