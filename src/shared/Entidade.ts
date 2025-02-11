import Id from "@/shared/Id";

export interface EntidadeProps {
    id?: string;
}

export default abstract class Entidade <Tipo, Props extends EntidadeProps> {
    readonly id: Id;
    readonly props: Props;

    constructor(props: Props) {
        this.id = new Id(props.id);
        this.props = {...props, id: this.id.valor};
    }

    igual(outraEntidade: Entidade<Tipo, Props>): boolean {
        return this.id.igual(outraEntidade?.id);
    }

    diferente(outraEntidade: Entidade<Tipo, Props>): boolean {
        return this.id.difente(outraEntidade?.id);
    }

    clone(novasProps: Props, ...args: any): Tipo {
        return new (this.constructor as any) ({...this.props, ...novasProps}, ...args);
    }
}