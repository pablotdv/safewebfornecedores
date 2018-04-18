export interface Proposta {
    PropostaId: string;
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
    PropostaArquivo: PropostaArquivo
}

export interface PropostaArquivo {
    PropostaId: string;
    Caminho: string;
    Nome: string;
}
export enum Situacao {
    Aberto = 1,
    Aprovada = 2,
    Reprovada = 3,
    PendenteDiretoria = 4,
    AprovadaDiretoria = 5
}

export interface PropostaFiltro {
    Nome: string;
    DataInicial: string;
    DataFinal: string;
    Fornecedor: string;
    Categoria: string;
    Situacao: number;
}