import ProgressoCurso, {
  ProgressoCursoProps,
} from "@/progresso/ProgressoCurso";
import Id from "@/shared/Id";
import { faker } from "@faker-js/faker/.";
import ProgressoAulaBuilder from "./ProgressoAulaBuilder";
import NomeCurso from "./NomeCurso";
import { ProgressoAulaProps } from "@/progresso/ProgressoAula";

export default class ProgressoCursoBuilder {
  private constructor(public props: ProgressoCursoProps) {}

  static criar(qtdeAulas?: number): ProgressoCursoBuilder {
    const aulas = ProgressoAulaBuilder.criarListaCom(qtdeAulas).map(
      (aula) => aula.props
    );
    return new ProgressoCursoBuilder({
      id: Id.novo.valor,
      emailUsuario: faker.internet.email(),
      nomeCurso: NomeCurso.aleatorio(),
      data: faker.date.recent(),
      aulaSelecionadaId: aulas[0]?.id,
      aulas,
    });
  }

  comId(id: string) {
    this.props.id = id;
    return this;
  }

  semId() {
    this.props.id = undefined;
    return this;
  }

  comNomeCurso(nome: string) {
    this.props.nomeCurso = nome;
    return this;
  }

  semNomeCurso(): ProgressoCursoBuilder {
    this.props.nomeCurso = undefined;
    return this;
  }

  comAulaSelecionadaId(id: string): ProgressoCursoBuilder {
    this.props.aulaSelecionadaId = id;
    return this;
  }

  semAulaSelecionadaId() {
    this.props.aulaSelecionadaId = undefined;
    return this;
  }

  comAulas(aulas: ProgressoAulaProps[]): ProgressoCursoBuilder {
    this.props.aulas = [...aulas];
    this.props.aulaSelecionadaId = this.props.aulas[0]?.id;
    return this;
  }

  semAulas() {
    this.props.aulas = undefined;
    return this;
  }

  comEmailUsuario(email: string): ProgressoCursoBuilder {
    this.props.emailUsuario = email;
    return this;
  }

  semEmailUsuario() {
    this.props.emailUsuario = undefined;
    return this;
  }

  agora() {
    return new ProgressoCurso(this.props);
  }
}
