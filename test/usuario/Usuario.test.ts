import Erros from "@/constants/Erros";
import UsuarioBuilder from "../data/UsuarioBuilder";
import Id from "@/shared/Id";

test('Deve criar um usuario', () => {
    const nomeCompleto = 'Fulano da Silva';
    const email = 'fulano.silva@zmail.com';
    const usuario = UsuarioBuilder.criar().comNome(nomeCompleto).comEmail(email).agora();

    expect(usuario.nome.completo).toBe(nomeCompleto);
    expect(usuario.email.valor).toBe(email);
    expect(usuario.senha).toBeDefined();
});

test('Deve criar um usuário sem id', () => {
    const usuario = UsuarioBuilder.criar().semId().agora();
    expect(usuario.id).toBeDefined();
});

test('Deve criar um usuário com id', () => {
    const id = Id.novo.valor;
    const usuario = UsuarioBuilder.criar().comId(id).agora();
    expect(usuario.id).toBeDefined();
});

test('Deve criar um usuário com senha', () => {
    const usuario = UsuarioBuilder.criar().comSenha('$2y$12$9XZilEs.44pjMZr8DlTW2.rBhzIe6u7aV1mYVmpgIXtUaeS3K7Fuu').agora();
    expect(usuario.senha).toBeDefined();
});

test('Deve criar um usuário sem senha', () => {
    const usuario = UsuarioBuilder.criar().semSenha().agora();
    expect(usuario.senha).toBeUndefined();
});

test('Deve lançar um erro com usuario sem nome', () => {
    expect(() => UsuarioBuilder.criar().semNome().agora()).toThrow(Erros.NOME_VAZIO);
});

test('Deve lançar um erro com usuario sem sobrenome', () => {
    expect(() => UsuarioBuilder.criar().comNome('Pedro').agora()).toThrow(Erros.NOME_SEM_SOBRENOME);
});

test('Deve lançar um erro com usuario sem email', () => {
    expect(() => UsuarioBuilder.criar().semEmail().agora()).toThrow(Erros.EMAIL_INVALIDO);
})