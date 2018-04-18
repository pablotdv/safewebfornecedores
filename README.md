# Introdução
Projeto desenvolvido como parte do processo seletivo da vaga de programador sênior na [safeweb](https://safeweb.com.br/)

# Tecnologias utilizadas
- Visual Studio Community 2017 Versão 15.6.6 [[download](https://www.visualstudio.com/pt-br/downloads/)]
- Visual Studio Code Versão 1.22.2 - Arquitetura x64 [[download](https://code.visualstudio.com/download)]
- Node: >=9.8.0 [[download](https://nodejs.org/en/download/releases/)]
- Angular CLI: 1.7.3 [[instalação](https://cli.angular.io/)]
- Microsoft SQL Server 2017 (RTM) - 14.0.1000.169 (X64)   Aug 22 2017 17:04:49   Copyright (C) 2017 Microsoft Corporation  Developer Edition (64-bit) on Windows 10 Pro 10.0 <X64> (Build 16299: )  [[download](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)]
- OS: Windows 10 Versão 1709

# Baixando o código fonte
- Abrindo o projeto Backend
1. Abra o CMD (Windows+R)
2. Rode o comando `git clone https://github.com/pablotdv/safewebfornecedores.git`
3. Vá para a pasta do projeto `cd safewebfornecedores\src`
4. Abra o projeto backend `start SafewebFornecedores.sln`
5. Abra o package manager console (`Tools | Nuget Package Manager | Package Manager Console`)
6. Caso necessário, restaure os pacotes
7. Rode o comando `Update-Database`

- Abrindo o projeto Frontend
1. Volte no CMD no diretório Raiz do projeto (pasta que contém o README.md)
1. Vá para a pasta do projeto `cd src\Frontend\SafewebFornecedores`
2. Rode o comando `npm install` para instalar as dependências necessárias
3. Abra o projeto Angular com o VS Code com o comando `code .`

# Rodando o projeto
Com o projeto backend e frontend abertos
1. No Visual Studio, aperte a tecla `F5` ou acesse o menu `Debug | Start Debugging`
2. No VS Code, abra o terminal `Ctrl + '` ou `View | Integrated Terminal`
3. Rode o comando `ng serve` no terminal do VS Code
4. Abra no navegador a url http://localhost:4200
- Versão de demonstração publicada no Azure: http://safewebfornecedores.azurewebsites.net/

# Login no sistema
- usuário: administrador@swf.com.br
- senha: Admin123@
- perfíl: Administradores


# RF01 - Gerenciar o cadastro de usuário
1. Acesse o menu `Usuários`.
2. Clique no sinal de `+`
3. Preencha os campos obrigatórios
4. Não esqueça de selecionar o Perfíl do usuário
5. Clique em Salvar
- Para editar um usuário, basta clicar no icone de edição (papel com um lapis)
- Para excluir um usuário, basta clicar no icone de exclução (lixeira)

# RF02 - Gerenciar o cadastro de fornecedores
1. Acesse o menu `Fornecedores`.
2. Clique no sinal de `+`
3. Preencha os campos obrigatórios
4. Clique em Salvar
- Para editar um fornecedor, basta clicar no icone de edição (papel com um lapis)
- Para excluir um fornecedor, basta clicar no icone de exclução (lixeira)

# RF03 - Gerenciar o cadastro de categorias
1. Acesse o menu `Categorias`.
2. Clique no sinal de `+`
3. Preencha os campos obrigatórios
4. Clique em Salvar
- Para editar um categoria, basta clicar no icone de edição (papel com um lapis)
- Para excluir um categoria, basta clicar no icone de exclução (lixeira)
- 
# RF04 - Gerenciar o cadastro de propostas de fornecedores
1. Acesse o menu `Propostas`.
2. Clique no sinal de `+`
3. Preencha os campos obrigatórios
4. Clique em Salvar
- Para editar um proposta, acesse os detalhes da proposta (ícone olho) e clique no editar
- Para excluir um proposta, acesse os detalhes da proposta (ícone olho) e clicar no excluir

# RF04.01 - Possibilitar o cadastro do arquivo da proposta
1. Acesse o menu `Propostas`
2. Clique nos detalhes da proposta
3. Vá na aba `PDF`
4. Selecione um arquivo PDF ou arraste o mesmo do Windows Explorer
5. Ao final do Upload o arquivo irá aparecer na aba PDF
OBS: proposta já cadastradada

# RF04.02 - Possibilitar a análise do arquivo da proposta
1. Acesse o menu `Propostas`
2. Clique nos detalhes da proposta
3. Clique no botão PDF
OBS: proposta já cadastrada e upload do pdf já realizado

# RF05 - Gerenciar o status das propostas de fornecedores
1. Acesse o menu `Propostas`
2. Clique nos detalhes da proposta
3. Para aprovar/reprovar a proposta clique no respectivo botão
OBS: proposta já cadastrada

# RF06 - Pesquisar propostas de fornecedores

# RF07 - Manter histórico do status das propostas
1. Acesse o menu `Propostas`
2. Clique nos detalhes da proposta
3. Aba `Histórico`
OBS: proposta já cadastrada