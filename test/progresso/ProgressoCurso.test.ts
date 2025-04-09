import Erros from "@/constants/Erros";
import ProgressoCursoBuilder from "../data/ProgressoCursoBuilder";

test("Deve lançar um erro ao criar um progresso com aulas indefinidas", () => {
  expect(() => {
    ProgressoCursoBuilder.criar().semAulas().agora();
  }).toThrow(Erros.PROGRESSO_CUSRO_SEM_AULAS);
});

test("Deve lançar um erro ao criar um progresso com aulas indefinidas", () => {
  expect(() => {
    ProgressoCursoBuilder.criar().comAulas([]).agora();
  }).toThrow(Erros.PROGRESSO_CUSRO_SEM_AULAS);
});
