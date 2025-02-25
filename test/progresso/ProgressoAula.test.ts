import Erros from "@/constants/Erros";
import ProgressoAulaBuilder from "../data/ProgressoAulaBuilder";
import Id from "@/shared/Id";

test("Deve retornar concluído como true mesmo quando não iniciado", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoIniciado()
    .concluido()
    .agora();
  expect(progresso.concluido).toBeTruthy();
});

test("Deve concluir o progresso sem iniciar", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoIniciado()
    .naoConcluido()
    .agora();
  const progressoConcluido = progresso.concluir();
  const dataConclusao = progressoConcluido.dataConlusao!.getTime();
  const dataAtual = new Date().getTime();

  expect(progressoConcluido.iniciado).toBeFalsy();
  expect(progressoConcluido.concluido).toBeTruthy();
  expect(dataAtual - dataConclusao).toBeLessThan(1000);
});

test("Deve concluir um progresso iniciado", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .iniciado()
    .naoConcluido()
    .agora();
  const progressoConcluido = progresso.concluir();

  expect(progressoConcluido.iniciado).toBeTruthy();
  expect(progressoConcluido.concluido).toBeTruthy();
});

test("Deve inicar um progresso com data de início e data de conclução", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .comDataInicio(new Date())
    .comDataConclusao(new Date())
    .agora();

  expect(progresso.dataInicio).toBeDefined();
  expect(progresso.dataConlusao).toBeDefined();
});

test("Deve lançar erro quando nome da aula form indefinido", () => {
  expect(() => ProgressoAulaBuilder.criar().semNomeDaAula().agora()).toThrow(
    Erros.NOME_VAZIO
  );
});

test("deve lancar erro quando duração for zerada", () => {
  expect(() => ProgressoAulaBuilder.criar().comDuracao(0).agora()).toThrow(
    Erros.DURACAO_ZERADA
  );
});

test("deve lancar erro quando duração for undefined", () => {
  expect(() => ProgressoAulaBuilder.criar().semDuracao().agora()).toThrow(
    Erros.DURACAO_ZERADA
  );
});

test("deve lancar erro quando duração for negativa", () => {
  expect(() => ProgressoAulaBuilder.criar().comDuracao(-10).agora()).toThrow(
    Erros.DURACAO_NEGATIVA
  );
});

test("deve lancar erro quando id for indefinido", () => {
  expect(() => ProgressoAulaBuilder.criar().semId().agora()).toThrow(
    Erros.ID_INVALIDO
  );
});

test("Deve iniciar um progresso", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .naoIniciado()
    .naoConcluido()
    .agora();
  const progressoIniciado = progresso.iniciar();

  expect(progressoIniciado.iniciado).toBeTruthy();
});

test("Deve zerar o progresso da aula", () => {
  const progresso = ProgressoAulaBuilder.criar()
    .comId(Id.novo.valor)
    .comNomeDaAula("Aprendendo Testes")
    .iniciado()
    .concluido()
    .agora();
  const novo = progresso.zerar();

  expect(novo.dataInicio).toBeDefined();
  expect(novo.iniciado).toBeTruthy();
  expect(novo.dataConlusao).toBeUndefined();
  expect(novo.concluido).toBeFalsy();
});
