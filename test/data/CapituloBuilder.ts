import { faker } from "@faker-js/faker/.";
import Capitulo, { CapituloProps } from "@/curso/Capitulo";
import NomesCapitulo from "./NomesCapitulo";
import AulaBuilder from "./AulaBuilder";
import Aula, { AulaProps } from "@/curso/Aula";

export default class CapituloBuilder {
  private constructor(private props: CapituloProps) {}

  static criar(qtdAulas: number = 10): CapituloBuilder {
    return new CapituloBuilder({
      nome: NomesCapitulo.aleatorio(),
      ordem: faker.number.int({ min: 1, max: 100 }),
      aulas: AulaBuilder.criarListaCom(qtdAulas).map((aula) => aula.props),
    });
  }

  static criarListaCom(qtdeCapitulos: number, qtdeAulas: number): Capitulo[] {
    const caítulo = (index: number) =>
      CapituloBuilder.criar(qtdeAulas)
        .comOrdem(index + 1)
        .agora();
    return Array.from({ length: qtdeCapitulos }).map((_, index) =>
      caítulo(index)
    );
  }

  comId(id: string): CapituloBuilder {
    this.props.id = id;
    return this;
  }

  comNome(nome: string): CapituloBuilder {
    this.props.nome = nome;
    return this;
  }

  semNome(): CapituloBuilder {
    this.props.nome = undefined;
    return this;
  }

  comOrdem(ordem: number): CapituloBuilder {
    this.props.ordem = ordem;
    return this;
  }

  semOrdem(): CapituloBuilder {
    this.props.ordem = undefined;
    return this;
  }

  comAulas(aulas: (Aula | AulaProps)[]): CapituloBuilder {
    this.props.aulas = aulas.map((aula) =>
      aula instanceof Aula ? aula.props : aula
    );
    return this;
  }

  semAulas(): CapituloBuilder {
    this.props.aulas = undefined;
    return this;
  }

  agora(): Capitulo {
    return new Capitulo(this.props);
  }
}
