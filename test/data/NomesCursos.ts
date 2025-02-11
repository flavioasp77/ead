export default class NomesCursos {
  static aleatorio(): string {
    const indice = Math.floor(Math.random() * NomesCursos.nomes.length);
    return NomesCursos.nomes[indice];
  }

  static readonly nomes = [
    "Arquiteruta Limpa",
    "Banco de dados",
    "Casos de Uso",
    "Código Limpo",
    "Desenvolvimento Ágil",
    "Engenharia de Software",
    "Estrutura de Dados",
    "Gestão de Projetos",
    "Inteligência Artificial",
    "Linguagem de Programação",
    "Métodos Ágeis",
    "Programação Orientada a Objetos",
    "Programação Web",
    "Redes de Computadores",
    "Segurança da Informação",
    "Sistemas Operacionais",
    "Sistemas Distribuídos",
    "Testes Automatizados",
    "Técnicas de Programação",
    "Tópicos Especiais em Sistemas para Internet",
    "Visão Computacional",
    "Web Services",
    "Web Services RESTful",
    "Web Services SOAP",
    "Web Services XML-RPC",
    "Web Services WSDL",
    "Web Services WSDL",
    "Web Services WSDL",
  ];
}
