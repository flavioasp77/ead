import { CursoProps } from "@/curso/Curso";
import NomesCursos from "./NomesCursos";
import { faker } from "@faker-js/faker/.";
import CapituloBuilder from "./CapituloBuilder";
import Capitulo from "@/curso/Capitulo";

export default class CursoBuilder {
  private constructor(private props: CursoProps) {}

  static criar(qtdCaitulos: number = 10, qtdeAulas: number = 10) {
    return new CursoBuilder({
      nome: NomesCursos.aleatorio(),
      data: faker.date.recent(),
      capitulos: CapituloBuilder.criarListaCom(qtdCaitulos, qtdeAulas).map(
        (capitulo: Capitulo) => capitulo.props
      ),
    });
  }
}
