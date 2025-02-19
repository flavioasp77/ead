import exp from "constants";
import CursoBuilder from "../data/CursoBuilder";

test("Deve criar um curso com novo id", () => {
  const curso = CursoBuilder.criar().semId().agora();
  expect(curso.id.valor).not.toBeNull();
});
