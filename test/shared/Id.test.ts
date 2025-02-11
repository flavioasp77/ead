import Erros from "@/constants/Erros";
import Id from "@/shared/Id";

test('Deve criar um novo id válido', () => {
    const id = Id.novo;

    expect(id.valor).toHaveLength(36);
    expect(id.novo).toBeTruthy();    
});

test('Deve lançar uma exceção ao criar id invalido', () => {
   expect(() => new Id('123')).toThrow(Erros.ID_INVALIDO);
});

test('Deve criar um novo id válido a partir de um id existente', () => {
    const valor = Id.novo.valor;
    const id = new Id(valor);

    expect(id.valor).toHaveLength(36);
    expect(id.novo).toBeFalsy();
});

test('Deve comparar dois ids como iguals', () => {
    const id = new Id();
    const outroId = new Id(id.valor);
    
    expect(id.igual(outroId)).toBe(true);
    expect(id.difente(outroId)).toBe(false);
});

test('Deve comparar dois ids como diferentes', () => {
    const id = new Id();
    const outroId = new Id();
    
    expect(id.igual(outroId)).toBe(false);
    expect(id.difente(outroId)).toBe(true);
})

test('Deve comparar um id com udefined', () => {
    const id = new Id();  
    
    expect(id.igual(undefined as any)).toBe(false);
    expect(id.difente(undefined as any)).toBe(true);
})