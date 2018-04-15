export interface Proposta {
    CategoriaId: string;
    FornecedorId: string;
    Numero: number;
    Nome: string;
    Data: Date;
    Valor: number;
    Descricao: string;
    Arquivo: string;
    DataSituacao: Date;
    Situacao: Situacao;
}

export interface PropostaEditar extends Proposta {
    PropostaId: string;
}

export enum Situacao {
    Aberto = 1,
    Aprovada = 2,
    Reprovada = 3,
    PendenteDiretoria = 4,
    AprovadaDiretoria = 5
}