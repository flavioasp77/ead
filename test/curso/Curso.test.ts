import Erros from "@/constants/Erros";
import CursoBuilder from "../data/CursoBuilder";
import AulaBuilder from "../data/AulaBuilder";
import Capitulo from "@/curso/Capitulo";
import CapituloBuilder from "../data/CapituloBuilder";
import Id from "@/shared/Id";
import Curso from "@/curso/Curso";
import NomeCurso from "../data/NomeCurso";

test("Deve criar um curso com novo id", () => {
  const curso = CursoBuilder.criar().semId().agora();
  expect(curso.id.valor).not.toBeNull();
});

test("Deve criar um curso com id", () => {
  const id = Id.novo.valor;
  const curso = CursoBuilder.criar().comId(id).agora();
  expect(curso.id.valor).toBe(id);
});

test("Deve criar um curso com nome", () => {
  const id = Id.novo.valor;
  const curso = CursoBuilder.criar().comNome("Modelagem de Domínio").agora();
  expect(curso.nome.completo).toBe("Modelagem de Domínio");
});

test("deve lancar erro ao tentar criar um curso sem nome", () => {
  expect(() => CursoBuilder.criar().semNome().agora()).toThrow(
    Erros.NOME_VAZIO
  );
});

test("deve lancar um erro ao tentar cirar um curso sem duração e sem capítulos", () => {
  expect(() =>
    CursoBuilder.criar().semDuracao().semCapitulos().agora()
  ).toThrow(Erros.CURSO_SEM_DURACAO);
});

test("deve lançar um erro ao tentar criar um curso sem quantidade de aulas e sem capítulos", () => {
  expect(() =>
    CursoBuilder.criar()
      .comDuracao(100)
      .semQuantidadeDeAulas()
      .semCapitulos()
      .agora()
  ).toThrow(Erros.CURSO_SEM_AULAS);
});

test("Deve calcular a duração do curso", () => {
  const aulas = [
    AulaBuilder.criar("Aula #1").comDuracao(63).comOrdem(1).agora(),
    AulaBuilder.criar("Aula #2").comDuracao(1007).comOrdem(2).agora(),
    AulaBuilder.criar("Aula #3").comDuracao(3784).comOrdem(3).agora(),
  ];
  const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
  const curso = CursoBuilder.criar()
    .comCapitulos([
      capitulo,
      capitulo.clone({ id: Id.novo.valor }),
      capitulo.clone({ id: Id.novo.valor }),
    ])
    .agora();

  expect(curso.props.duracao).toBe(14562);
  expect(curso.duracao.segundos).toBe(14562);
  expect(curso.duracao.hms).toBe("04h 02m 42s");
});

test("Deve criar um curso sem capítulo e manter a duração e a quantidade de aulas", () => {
  const curso = CursoBuilder.criar()
    .semCapitulos()
    .comDuracao(60 * 58)
    .comQuantidadeDeAulas(45)
    .agora();

  expect(curso.capitulos).toHaveLength(0);
  expect(curso.duracao.hm).toBe("58m");
  expect(curso.quantidadeDeAulas).toBe(45);
});

test("Deve recalcular duração e quantidade de aulas quando tiver capitulos", () => {
  const curso = CursoBuilder.criar(10, 20)
    .comDuracao(60 * 58)
    .comQuantidadeDeAulas(45)
    .agora();
  expect(curso.quantidadeDeAulas).toBe(200);
  expect(curso.duracao.segundos).toBeGreaterThan(0);
});

test("Deve calcular a ordem corretamente", () => {
  const capitulos = [
    CapituloBuilder.criar().comOrdem(1).agora(),
    CapituloBuilder.criar().comOrdem(1).agora(),
    CapituloBuilder.criar().comOrdem(1).agora(),
  ];

  const curso = CursoBuilder.criar().comCapitulos(capitulos).agora();
  expect(curso.capitulos[0].ordem.valor).toBe(1);
  expect(curso.capitulos[1].ordem.valor).toBe(2);
  expect(curso.capitulos[2].ordem.valor).toBe(3);
});

test("Deve criar curso com capitulos undefined", () => {
  const curso = new Curso({
    nome: NomeCurso.aleatorio(),
    duracao: 100,
    quantidadeDeAulas: 10,
    capitulos: undefined,
  });

  expect(curso.capitulos).toHaveLength(0);
});

test("Deve lancar um erro ao tentar criar um curso com capítulo sem aulas", () => {
  expect(
    () =>
      new Curso({
        nome: NomeCurso.aleatorio(),
        duracao: 100,
        quantidadeDeAulas: 1,
        capitulos: [
          {
            nome: "Aula #1",
            ordem: 1,
            aulas: undefined,
          },
        ],
      })
  ).toThrow(Erros.CAPITULO_SEM_AULAS);
});

test("Deve adicinar um capitulo", () => {
  const curso = CursoBuilder.criar().agora();
  const novosCapitulo = CapituloBuilder.criar().agora();
  const novoCurso = curso.adicionarCapitulo(novosCapitulo);
  expect(novoCurso.ultimoCapitulo.nome.completo).toBe(
    novosCapitulo.nome.completo
  );
});

test("Deve adicionar um capitulo no inicio do curso", () => {
  const curso = CursoBuilder.criar().agora();
  const novosCapitulo = CapituloBuilder.criar().agora();
  const novoCurso = curso.adicionarCapitulo(novosCapitulo, 0);
  expect(novoCurso.primeiroCapitulo.nome.completo).toBe(
    novosCapitulo.nome.completo
  );
});

test("Deve remover capítulo", () => {
  const curso = CursoBuilder.criar().agora();
  const segundoCapitulo = curso.capitulos[1];
  const novoCurso = curso.removerCapitulo(segundoCapitulo);
  expect(novoCurso.capitulos.length).toBe(curso.capitulos.length - 1);
});

test("Deve mover o capítulo uma posiçao para baixo", () => {
  const curso = CursoBuilder.criar().agora();
  const segundoCapitulo = curso.capitulos[1];
  const novoCurso = curso.moverCapituloParaBaixo(segundoCapitulo);
  expect(novoCurso.capitulos[2].nome.completo).toBe(
    segundoCapitulo.nome.completo
  );
});

test("Deve mover o capítulo uma posiçao para cima", () => {
  const curso = CursoBuilder.criar().agora();
  const segundoCapitulo = curso.capitulos[1];
  const novoCurso = curso.moverCapituloParaCima(segundoCapitulo);
  expect(novoCurso.capitulos[0].nome.completo).toBe(
    segundoCapitulo.nome.completo
  );
});

test("Deve ignorar quanto mover primeira aula para cima", () => {
  const curso = CursoBuilder.criar().agora();
  const novoCurso = curso.moverCapituloParaCima(curso.primeiroCapitulo);
  expect(novoCurso).toBe(curso);
});

test("Deve ignorar quanto mover última aula para baixo", () => {
  const curso = CursoBuilder.criar().agora();
  const novoCurso = curso.moverCapituloParaBaixo(curso.ultimoCapitulo);
  expect(novoCurso).toBe(curso);
});

test("deve atualizar uma aula no curso", () => {
  const curso = CursoBuilder.criar().agora();
  const novaAula = curso.primeiroCapitulo.primeiraAula.clone({ duração: 1000 });
  const novoCurso = curso.atualizarAula(novaAula);
  expect(novoCurso.primeiroCapitulo.primeiraAula.nome.completo).toBe(
    novaAula.nome.completo
  );
  expect(novoCurso.aulas[0].duracao.segundos).toBe(novaAula.duracao.segundos);
});
