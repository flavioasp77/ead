import ProgressoAula, { ProgressoAulaProps } from "@/progresso/ProgressoAula";
import Id from "@/shared/Id";
import { faker } from "@faker-js/faker/.";
import NomesAulas from "./NomesAula";

export default class ProgressoAulaBuilder {
  private constructor(public props: ProgressoAulaProps) {}

  static criar(): ProgressoAulaBuilder {
    const iniciado = faker.datatype.boolean();
    const concluido = faker.datatype.boolean();
    return new ProgressoAulaBuilder({
      id: Id.novo.valor,
      nomeAula: NomesAulas.aleatorio(),
      duracao: faker.number.int({ min: 90, max: 3600 }),
      dataInicio: iniciado ? faker.date.recent() : undefined,
      dataConclusao: concluido ? faker.date.recent() : undefined,
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

  comNomeDaAula(nome: string) {
    this.props.nomeAula = nome;
    return this;
  }

  semNomeDaAula() {
    this.props.nomeAula = undefined;
    return this;
  }

  comDuracao(duracao: number) {
    this.props.duracao = duracao;
    return this;
  }

  semDuracao() {
    this.props.duracao = undefined;
    return this;
  }
  comDataInicio(data: Date) {
    this.props.dataInicio = data;
    return this;
  }

  comDataConclusao(data: Date) {
    this.props.dataConclusao = data;
    return this;
  }

  iniciado(): ProgressoAulaBuilder {
    this.props.dataInicio = new Date();
    return this;
  }

  naoIniciado(): ProgressoAulaBuilder {
    this.props.dataInicio = undefined;
    return this;
  }

  concluido(): ProgressoAulaBuilder {
    this.props.dataConclusao = new Date();
    return this;
  }

  naoConcluido(): ProgressoAulaBuilder {
    this.props.dataConclusao = undefined;
    return this;
  }

  agora() {
    return new ProgressoAula(this.props);
  }
}
