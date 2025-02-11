import Erros from "@/constants/Erros";
import CapituloBuilder from "../data/CapituloBuilder";
import Id from "@/shared/Id";
import AulaBuilder from "../data/AulaBuilder";
import Capitulo from "@/curso/Capitulo";
import Aula from "@/curso/Aula";

test("Deve lançar erro ao criar um capítulo sem nome", () => {
  expect(() => CapituloBuilder.criar().semNome().agora()).toThrow(
    Erros.NOME_VAZIO
  );
});

test("Deve lançar erro ao criar um capítulo sem aulas", () => {
  expect(() => CapituloBuilder.criar().semAulas().agora()).toThrow(
    Erros.CAPITULO_SEM_AULAS
  );
});

test("Deve possuir ordem padrão como 1", () => {
  const capitulo = CapituloBuilder.criar().semOrdem().agora();
  expect(capitulo.ordem.valor).toBe(1);
});

test("Deve lançar erro ao tentar criar um capítulo com ordem zero ou negativa", () => {
  expect(() => CapituloBuilder.criar().comOrdem(0).agora()).toThrow(
    Erros.ORDEM_INVALIDA
  );
  expect(() => CapituloBuilder.criar().comOrdem(-1).agora()).toThrow(
    Erros.ORDEM_INVALIDA
  );
});

test("Deve criar um capitulo com nome", () => {
  const capitulo = CapituloBuilder.criar().comNome("Introdução").agora();
  expect(capitulo.nome.valor).toBe("Introdução");
});

test("Deve criar um capítulo com id", () => {
  const id = Id.novo.valor;
  const capitulo = CapituloBuilder.criar().comId(id).agora();
  expect(capitulo.id.valor).toBe(id);
});

test("Deve criar um capítulo com aulas", () => {
  const aulas = AulaBuilder.criarListaCom(10);
  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  expect(capitulo.aulas.length).toBe(10);
});

test("Deve calcular a duração do capítulo", () => {
  const aulas = [
    AulaBuilder.criar("Aula #1").comDuracao(63).semOrdem().agora(),
    AulaBuilder.criar("Aula #2").comDuracao(1007).semOrdem().agora(),
    AulaBuilder.criar("Aula #3").comDuracao(3784).semOrdem().agora(),
  ];

  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  expect(capitulo.duracao.segundos).toBe(4854);
  expect(capitulo.duracao.hm).toBe("01h 20m");
});

test("Deve calcular a ordem corretamente", () => {
  const aulas = [
    AulaBuilder.criar("Aula #1").comDuracao(63).semOrdem().agora(),
    AulaBuilder.criar("Aula #2").comDuracao(1007).semOrdem().agora(),
    AulaBuilder.criar("Aula #3").comDuracao(3784).semOrdem().agora(),
  ];
  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  expect(capitulo.aulas[0].ordem.valor).toBe(1);
  expect(capitulo.aulas[1].ordem.valor).toBe(2);
  expect(capitulo.aulas[2].ordem.valor).toBe(3);
});

test("Deve calcular a ordem corretamente nas props", () => {
  const aulas = [
    AulaBuilder.criar("Aula #1").comDuracao(63).semOrdem().agora(),
    AulaBuilder.criar("Aula #2").comDuracao(1007).semOrdem().agora(),
    AulaBuilder.criar("Aula #3").comDuracao(3784).semOrdem().agora(),
  ];

  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  expect(capitulo.props.aulas![0].ordem).toBe(1);
  expect(capitulo.props.aulas![1].ordem).toBe(2);
  expect(capitulo.props.aulas![2].ordem).toBe(3);
});

test("Deve retornar quantidade de aulas", () => {
  const capitulo = CapituloBuilder.criar(3).agora();
  expect(capitulo.quantidadeAulas).toBe(3);
});

test("Deve retornar a primeira e ultima aula", () => {
  const aulas = [
    AulaBuilder.criar("Aula #1").comDuracao(63).comOrdem(1).agora(),
    AulaBuilder.criar("Aula #2").comDuracao(1007).comOrdem(2).agora(),
    AulaBuilder.criar("Aula #3").comDuracao(3784).comOrdem(3).agora(),
  ];

  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  expect(capitulo.primeiraAula.nome.completo).toBe("Aula #1");
  expect(capitulo.ultimaAula.ordem.valor).toBe(3);
});

test("Deve instanciar corretamente as aulas a partir dos props", () => {
  const aulasMock = [
    { nome: "Aula 1", duração: 10, videoUrl: "http://video1.com", ordem: 1 },
    { nome: "Aula 2", duração: 15, videoUrl: "http://video2.com", ordem: 2 },
  ];

  const capitulo = new Capitulo({
    nome: "Capítulo 1",
    ordem: 1,
    aulas: aulasMock,
  });

  expect(capitulo.aulas).toHaveLength(2);
  expect(capitulo.aulas[0]).toBeInstanceOf(Aula);
  expect(capitulo.aulas[1]).toBeInstanceOf(Aula);
});

test("deve aceitar uma lista de instâncias de Aula", () => {
  const aula = new Aula({
    nome: "Aula 1",
    duração: 60,
    videoUrl: "http://example.com",
    ordem: 1,
  });
  const builder = CapituloBuilder.criar().comAulas([aula]);

  const capitulo = builder.agora();
  expect(capitulo.aulas).toHaveLength(1);
  expect(capitulo.aulas[0].nome.valor).toBe("Aula 1");
});

test("deve aceitar uma lista de objetos AulaProps", () => {
  const aulaProps = {
    nome: "Aula 1",
    duração: 60,
    videoUrl: "http://example.com",
    ordem: 1,
  };
  const builder = CapituloBuilder.criar().comAulas([aulaProps]);

  const capitulo = builder.agora();
  expect(capitulo.aulas).toHaveLength(1);
  expect(capitulo.aulas[0].nome.valor).toBe("Aula 1");
});

test("Deve adicionar aula", () => {
  const capitulo = CapituloBuilder.criar(3).agora();
  const novaAula = AulaBuilder.criar("Aula #4").agora();
  const novoCapitulo = capitulo.adicionarAula(novaAula);

  expect(novoCapitulo.ultimaAula.nome.completo).toBe(novaAula.nome.completo);
  expect(novoCapitulo.quantidadeAulas).toBe(4);
});

test("Deve adicionar aula no inicio do capitulo", () => {
  const capitulo = CapituloBuilder.criar(3).agora();
  const novaAula = AulaBuilder.criar("Bem vindos").agora();
  const novoCapitulo = capitulo.adicionarAula(novaAula, 0);

  expect(novoCapitulo.primeiraAula.nome.completo).toBe(novaAula.nome.completo);
  expect(novoCapitulo.quantidadeAulas).toBe(4);
});

test("Deve remover uma aula", () => {
  const capitulo = CapituloBuilder.criar(5).agora();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.removerAula(segundaAula);

  expect(novoCapitulo.quantidadeAulas).toBe(4);
});

test("Deve mover a aula uma posiçao para baixo", () => {
  const capitulo = CapituloBuilder.criar().agora();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.moverAulaParaBaixo(segundaAula);
  expect(novoCapitulo.aulas[2].nome.completo).toBe(segundaAula.nome.completo);
});

test("Deve mover a aula uma posiçao para cima", () => {
  const capitulo = CapituloBuilder.criar().agora();
  const segundaAula = capitulo.aulas[1];
  const novoCapitulo = capitulo.moverAulaParaCima(segundaAula);
  expect(novoCapitulo.aulas[0].nome.completo).toBe(segundaAula.nome.completo);
});

test("Deve ignorar quanto mover primeira aula para cima", () => {
  const capitulo = CapituloBuilder.criar().agora();
  const novoCapitulo = capitulo.moverAulaParaCima(capitulo.primeiraAula);
  expect(novoCapitulo).toBe(capitulo);
});

test("Deve ignorar quanto mover última aula para baixo", () => {
  const capitulo = CapituloBuilder.criar().agora();
  const novoCapitulo = capitulo.moverAulaParaBaixo(capitulo.ultimaAula);
  expect(novoCapitulo).toBe(capitulo);
});
