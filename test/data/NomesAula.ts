export default class NomesCapitulo {
  static aleatorio() {
    const incide = Math.floor(Math.random() * NomesCapitulo.nomes.length);
    return NomesCapitulo.nomes[incide];
  }

  static readonly nomes = [
    "Abstraçao",
    "Algoritmo",
    "Arquitetura",
    "Banco de Dados",
    "Cálculo",
    "Código",
    "Conceito",
    "Construção",
    "Dados",
    "Desenvolvimento",
    "Estrutura",
    "Estrutura de Dados",
    "React",
    "Nest",
    "Configurando TypeScript",
    "Configurando React",
    "Destructuring",
    "Express",
    "Git",
    "GraphQL",
    "Programação Orientada a Objetos",
    "Operadores",
    "Princípios de Programação",
    "Programação Funcional",
  ];
}
