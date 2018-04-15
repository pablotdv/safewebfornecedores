export interface Fornecedor {    
    CpfCnpj: string;
    Nome: string;
    Telefone: string;
    Email: string;    
}

export interface FornecedorEditar extends Fornecedor {    
    FornecedorId: string;
}