import Entidade, { EntidadeProps } from "@/shared/Entidade";
import Id from "@/shared/Id";

interface TestProps extends EntidadeProps {
    nome? :string;
    idade?: number;
}

class EntidadeTeste extends Entidade<EntidadeTeste, TestProps> {
    readonly nome: string;
    readonly idade: number;

    constructor(props: TestProps) {
        super(props);
        this.nome = props.nome ?? '';
        this.idade = props.idade ?? 0;
    }
}

test('Deve comparar duas entidades diferentes', () => {
    const e1 = new EntidadeTeste({nome: 'Pedro Pedreira', idade: 18});
    const e2 = new EntidadeTeste({nome: 'Pedro Pedreira', idade: 18});

    expect(e1.igual(e2)).toBe(false);
    expect(e1.diferente(e2)).toBe(true);
});

test('Deve comparar duas entidade com mesmo id e atributos diferentes', () => {
    const id = Id.novo.valor
    const e1 = new EntidadeTeste({id, nome: 'Pedro Pedreira', idade: 18});
    const e2 = new EntidadeTeste({id, nome: 'Paulo Pedreira', idade: 15});

    expect(e1.igual(e2)).toBe(true);
    expect(e1.diferente(e2)).toBe(false);
})

test('Deve comparar entidade com undefined ou null', () => {
    const e1 = new EntidadeTeste({ nome: 'Pedro Pedreira', idade: 18 });
    expect(e1.igual(undefined as any)).toBe(false);
    expect(e1.diferente(undefined as any)).toBe(true);
    expect(e1.igual(null as any)).toBe(false);
    expect(e1.diferente(null as any)).toBe(true);
})

test('Deve clonar uma pessoa com nome diferente', () => {
    const e1 = new EntidadeTeste({nome: 'Maria da Silva', idade: 55});
    const e2 = e1.clone({nome: 'Maria da Silva Pereira'});

    expect(e2.nome).toBe('Maria da Silva Pereira');
    expect(e2.idade).toBe(e1.idade);
})

test('Deve clonar uma pessoa com nome diferente', () => {
    const e1 = new EntidadeTeste({nome: 'Maria da Silva', idade: 55});
    const e2 = e1.clone({id: Id.novo.valor});

    expect(e2.nome).toBe(e1.nome);
    expect(e2.idade).toBe(e1.idade);
    expect(e1.id.difente(e2.id)).toBe(true);
})