import Erros from "@/constants/Erros";
import AulaBuilder from "../data/AulaBuilder";
import Id from "@/shared/Id";
import NomesAulas from "../data/NomesAula";

test("Deve lancar um erro ao tentar criar aula com ducação zerada", () => {
  expect(() => AulaBuilder.criar().comDuracao(0).agora()).toThrow(
    Erros.AULA_DURACAO_ZERADA
  );
});

test("Deve possuir possuir ordem padrão como 1", () => {
  const aula = AulaBuilder.criar().semOrdem().agora();
  expect(aula.ordem.valor).toBe(1);
});

test("Deve lancar um erro ao tentart crair aula com ordem zerada ou negativa", () => {
  expect(() => AulaBuilder.criar().comOrdem(0).agora()).toThrow(
    Erros.ORDEM_INVALIDA
  );
  expect(() => AulaBuilder.criar().comOrdem(-10).agora()).toThrow(
    Erros.ORDEM_INVALIDA
  );
});

test("Deve lancar um erro ao tentart crair aula com nome pequeno", () => {
  expect(() => AulaBuilder.criar().comNome("X").agora()).toThrow(
    Erros.NOME_PEQUENO
  );
});

test("Deve criar aula com ID", () => {
  const id = Id.novo.valor;
  const aula = AulaBuilder.criar().comId(id).agora();
  expect(aula.id.valor).toBeDefined();
});

test("Deve criar uma aula sem nome", () => {
  expect(() => AulaBuilder.criar().semNome().agora()).toThrow(
    Erros.NOME_PEQUENO
  );
  expect(() => AulaBuilder.criar().semNome().agora()).toThrow(Erros.NOME_VAZIO);
});

test("Deve criar uma aula sem duração", () => {
  expect(() => AulaBuilder.criar().semDuracao().agora()).toThrow(
    Erros.AULA_DURACAO_ZERADA
  );
});

test("Deve criar uma aula com nome aleatório", () => {
  const aula = AulaBuilder.criar().agora();
  expect(aula.nome).toBeDefined();
});

test("Deve criar uma aula com nome definido", () => {
  const nome = NomesAulas.aleatorio();
  const aula = AulaBuilder.criar(nome).agora();
  expect(aula.nome).toBeDefined();
});
