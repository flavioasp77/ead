export default class NomesAulas {
  static aleatorio() {
    const incide = Math.floor(Math.random() * NomesAulas.nomes.length);
    return NomesAulas.nomes[incide];
  }

  static readonly nomes = [
    "Introdução",
    "Conclusão",
    "Conceitos Básicos",
    "Fundamentos",
    "Desafios",
    "Configuração do Ambiente",
    "Teoria",
    "Prática",
  ];
}
