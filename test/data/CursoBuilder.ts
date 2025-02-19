import Curso, { CursoProps } from "@/curso/Curso";
import NomeCurso from "./NomeCurso";
import { faker } from "@faker-js/faker/.";
import CapituloBuilder from "./CapituloBuilder";
import Capitulo from "@/curso/Capitulo";

export default class CursoBuilder {
  private constructor(private props: CursoProps) {}

  static criar(qtdCaitulos: number = 10, qtdeAulas: number = 10) {
    return new CursoBuilder({
      nome: NomeCurso.aleatorio(),
      data: faker.date.recent(),
      capitulos: CapituloBuilder.criarListaCom(qtdCaitulos, qtdeAulas).map(
        (capitulo: Capitulo) => capitulo.props
      ),
    });
  }

  comId(id: string): CursoBuilder {
    this.props.id = id;
    return this;
  }

  semId(): CursoBuilder {
    this.props.id = undefined;
    return this;
  }

  comNome(nome: string): CursoBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): CursoBuilder {
    this.props.nome = undefined;
    return this;
  }

  comDuracao(duracao: number): CursoBuilder {
    this.props.duracao = duracao;
    return this;
  }

  semDuracao(): CursoBuilder {
    this.props.duracao = undefined;
    return this;
  }

  comQuantidadeDeAulas(quantidadeDeAulas: number): CursoBuilder {
    this.props.quantidadeDeAulas = quantidadeDeAulas;
    return this;
  }

  semQuantidadeDeAulas(): CursoBuilder {
    this.props.quantidadeDeAulas = undefined;
    return this;
  }

  comCapitulos(capitulos: Capitulo[]): CursoBuilder {
    this.props.capitulos = capitulos.map((capitulo) => capitulo.props);
    return this;
  }

  semCapitulos(): CursoBuilder {
    this.props.capitulos = undefined;
    return this;
  }

  agora(): Curso {
    return new Curso(this.props);
  }
}
